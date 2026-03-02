import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoUpload } from "@/components/PhotoUpload";
import { AnalysisLoader } from "@/components/AnalysisLoader";
import { ResultCard } from "@/components/ResultCard";
import { ShareButtons } from "@/components/ShareButtons";
import { AdSlot } from "@/components/AdSlot";
import { useAnalysis } from "@/hooks/useAnalysis";

const FLOATING_EMOJIS = ["🐶", "🐱", "🦊", "🐻", "🐰", "🦌", "🐹", "🐺", "🐧", "🦉", "🐿️", "🦕"];

const ANIMAL_GRID = [
  { emoji: "🐶", id: "dog" },
  { emoji: "🐱", id: "cat" },
  { emoji: "🦊", id: "fox" },
  { emoji: "🐻", id: "bear" },
  { emoji: "🐰", id: "rabbit" },
  { emoji: "🦌", id: "deer" },
  { emoji: "🐹", id: "hamster" },
  { emoji: "🐺", id: "wolf" },
  { emoji: "🐧", id: "penguin" },
  { emoji: "🦉", id: "owl" },
  { emoji: "🐿️", id: "squirrel" },
  { emoji: "🦕", id: "dinosaur" },
];

const FloatingEmoji = memo(function FloatingEmoji({ emoji, index }: { emoji: string; index: number }) {
  const duration = 3 + (index % 4) * 0.8;
  const delay = (index * 0.3) % 2;
  const x = ((index * 137.5) % 100);

  return (
    <motion.span
      className="absolute select-none text-2xl pointer-events-none"
      style={{ left: `${x}%`, top: "-2rem", opacity: 0.15 }}
      animate={{ y: ["0vh", "110vh"], scale: [1, 1.08, 1] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: index * 0.5,
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      aria-hidden="true"
    >
      {emoji}
    </motion.span>
  );
});

export function HomePage() {
  const { t } = useTranslation();
  const { status, result, error, previewUrl, analyze, reset } = useAnalysis();

  return (
    <>
      <Helmet>
        <title>{t("seo.homeTitle")}</title>
        <meta name="description" content={t("seo.homeDescription")} />
        <meta name="keywords" content={t("seo.homeKeywords")} />
        <meta property="og:title" content={t("seo.ogTitle")} />
        <meta property="og:description" content={t("seo.ogDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://animal-face.quizlab.me/og-image.png" />
        <meta property="og:url" content="https://animal-face.quizlab.me/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("seo.twitterTitle")} />
        <meta name="twitter:description" content={t("seo.twitterDescription")} />
        <meta name="twitter:image" content="https://animal-face.quizlab.me/og-image.png" />
        <link rel="canonical" href="https://animal-face.quizlab.me/" />
      </Helmet>

      <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOATING_EMOJIS.map((emoji, i) => (
            <FloatingEmoji key={i} emoji={emoji} index={i} />
          ))}
        </div>

        <div className="relative mx-auto max-w-2xl px-4 py-12">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="text-center space-y-3">
                  <motion.h1
                    className="text-4xl font-black tracking-tight sm:text-5xl"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B, #EF4444, #EC4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {t("home.title")}
                  </motion.h1>
                  <motion.p
                    className="text-base text-muted-foreground sm:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t("home.subtitle")}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap justify-center gap-1.5 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {ANIMAL_GRID.map(({ emoji, id }) => (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur-sm"
                      >
                        <span>{emoji}</span>
                        <span className="hidden sm:inline">{t(`animals.${id}.name`)}</span>
                      </span>
                    ))}
                  </motion.div>
                </div>

                <AdSlot />

                <PhotoUpload onFile={analyze} />
              </motion.div>
            )}

            {(status === "uploading" || status === "analyzing") && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <AnalysisLoader />
              </motion.div>
            )}

            {status === "done" && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <ResultCard result={result} previewUrl={previewUrl} />

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("result.share")}
                  </p>
                  <ShareButtons topAnimalId={result.topAnimal} />
                </div>

                <AdSlot />

                <Button variant="outline" onClick={reset} className="gap-2">
                  <RefreshCw className="size-4" />
                  {t("result.retake")}
                </Button>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-20 text-center"
              >
                <span className="text-5xl" aria-hidden="true">😢</span>
                <p className="text-base font-medium text-foreground">{t("common.error")}</p>
                {error && (
                  <p className="text-xs text-muted-foreground max-w-sm">{error}</p>
                )}
                <Button onClick={reset}>{t("common.retry")}</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
