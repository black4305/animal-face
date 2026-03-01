import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export interface FacialFeatures {
  eye_width_ratio: number;
  eye_height_ratio: number;
  nose_length_ratio: number;
  nose_width_ratio: number;
  face_roundness: number;
  lip_thickness: number;
  jaw_angle: number;
  forehead_ratio: number;
  eye_distance_ratio: number;
  face_taper: number;
}

const WASM_PATH = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function getLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
        outputFaceBlendshapes: false,
        runningMode: "IMAGE",
        numFaces: 1,
      });
    })();
  }
  return landmarkerPromise;
}

function dist(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

function loadImageBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

export async function extractFeatures(imageFile: File): Promise<FacialFeatures> {
  const landmarker = await getLandmarker();
  const bitmap = await loadImageBitmap(imageFile);

  const result = landmarker.detect(bitmap);
  bitmap.close();

  if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
    throw new Error("No face detected in the image.");
  }

  const lm = result.faceLandmarks[0];

  const pt = (idx: number): [number, number] => [lm[idx].x, lm[idx].y];

  // Face bounding box using normalised coordinates (0-1)
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of lm) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const faceWidth = maxX - minX;
  const faceHeight = maxY - minY;

  // Eyes — outer/inner corners and top/bottom
  const [leox, leoy] = pt(33);   // left eye outer
  const [leix, leiy] = pt(133);  // left eye inner
  const [letx, lety] = pt(159);  // left eye top
  const [lebx, leby] = pt(145);  // left eye bottom

  const [reox, reoy] = pt(263);  // right eye outer
  const [reix, reiy] = pt(362);  // right eye inner
  const [retx, rety] = pt(386);  // right eye top
  const [rebx, reby] = pt(374);  // right eye bottom

  const leftEyeW = dist(leox, leoy, leix, leiy);
  const leftEyeH = dist(letx, lety, lebx, leby);
  const rightEyeW = dist(reox, reoy, reix, reiy);
  const rightEyeH = dist(retx, rety, rebx, reby);
  const avgEyeW = (leftEyeW + rightEyeW) / 2;
  const avgEyeH = (leftEyeH + rightEyeH) / 2;

  // Eye centre distance
  const leftCx = (leox + leix) / 2;
  const leftCy = (leoy + leiy) / 2;
  const rightCx = (reox + reix) / 2;
  const rightCy = (reoy + reiy) / 2;
  const eyeDistance = dist(leftCx, leftCy, rightCx, rightCy);

  // Nose: tip 1, bridge 6, left ala 98, right ala 327
  const [ntx, nty] = pt(1);
  const [nbx, nby] = pt(6);
  const [nlx, nly] = pt(98);
  const [nrx, nry] = pt(327);
  const noseLength = dist(nbx, nby, ntx, nty);
  const noseWidth = dist(nlx, nly, nrx, nry);

  // Lips: top 13, bottom 14
  const [ltx, lty] = pt(13);
  const [lbx, lby] = pt(14);
  const lipHeight = dist(ltx, lty, lbx, lby);

  // Jaw and cheekbone
  const [jlx, jly] = pt(234);
  const [jrx, jry] = pt(454);
  const [clx, cly] = pt(123);
  const [crx, cry] = pt(352);
  const jawWidth = dist(jlx, jly, jrx, jry);
  const cheekWidth = dist(clx, cly, crx, cry);

  // Forehead: brow landmarks 105 (left), 334 (right)
  const [blx, bly] = pt(105);
  const [brx, bry] = pt(334);
  const browY = (bly + bry) / 2;
  void blx; void brx; // used only for y
  const foreheadH = browY - minY;

  const safeFw = faceWidth > 0 ? faceWidth : 1;
  const safeFh = faceHeight > 0 ? faceHeight : 1;
  const safeCw = cheekWidth > 0 ? cheekWidth : 1;

  return {
    eye_width_ratio: avgEyeW / safeFw,
    eye_height_ratio: avgEyeH / safeFh,
    nose_length_ratio: noseLength / safeFh,
    nose_width_ratio: noseWidth / safeFw,
    face_roundness: safeFw / safeFh,
    lip_thickness: lipHeight / safeFh,
    jaw_angle: jawWidth / safeCw,
    forehead_ratio: foreheadH / safeFh,
    eye_distance_ratio: eyeDistance / safeFw,
    face_taper: jawWidth / safeFw,
  };
}
