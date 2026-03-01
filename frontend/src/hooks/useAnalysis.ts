import { useState, useCallback, useRef } from "react";
import { analyzeImage, type AnalysisResult } from "@/lib/api";
import { extractFeatures } from "@/lib/faceMesh";

export type AnalysisStatus = "idle" | "uploading" | "analyzing" | "done" | "error";

export interface AnalysisState {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  previewUrl: string | null;
}

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    status: "idle",
    result: null,
    error: null,
    previewUrl: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const analyze = useCallback(async (file: File) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const previewUrl = URL.createObjectURL(file);

    setState({
      status: "uploading",
      result: null,
      error: null,
      previewUrl,
    });

    await new Promise((resolve) => setTimeout(resolve, 600));

    setState((prev) => ({ ...prev, status: "analyzing" }));

    try {
      const features = await extractFeatures(file);
      const result = await analyzeImage(features, controller.signal);
      setState((prev) => ({ ...prev, status: "done", result }));
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState((prev) => {
      if (prev.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return { status: "idle", result: null, error: null, previewUrl: null };
    });
  }, []);

  return { ...state, analyze, reset };
}
