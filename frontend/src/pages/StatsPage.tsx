import { useEffect, useState, useMemo, useCallback, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getStats, type Stats } from "@/lib/api";
import { animals } from "@/data/animals";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export function StatsPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    if (!stats) return [];
    return animals
      .map((a) => ({ ...a, count: stats.animalCounts[a.id] ?? 0 }))
      .sort((a, b) => b.count - a.count);
  }, [stats]);

  const maxCount = useMemo(() => sorted[0]?.count ?? 1, [sorted]);
  const topAnimal = useMemo(() => sorted[0], [sorted]);

  const handleRetry = useCallback(() => {
    setError(false);
    setLoading(true);
    getStats().then(setStats).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("stats.statsTitle")}</title>
        <meta name="description" content={t("stats.statsDescription")} />
        <meta property="og:title" content={t("stats.statsOgTitle")} />
        <meta property="og:description" content={t("stats.statsOgDescription")} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://animal-face.quizlab.me/stats" />
      </Helmet>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-black tracking-tight">{t("stats.title")}</h1>

          {loading && (
            <div className="flex justify-center py-20">
              <span className="text-4xl animate-bounce" aria-hidden="true">🐾</span>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <span className="text-5xl" aria-hidden="true">😢</span>
              <p className="text-base font-medium text-foreground">{t("common.error")}</p>
              <Button onClick={handleRetry}>
                {t("common.retry")}
              </Button>
            </div>
          )}

          {!loading && stats && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
                      {t("stats.totalTests")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black">
                      {stats.totalAnalyses.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {topAnimal && (
                  <Card
                    style={{
                      background: `linear-gradient(135deg, ${topAnimal.color}18 0%, ${topAnimal.color}08 100%)`,
                      borderColor: `${topAnimal.color}40`,
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
                        {t("stats.mostPopular")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl" aria-hidden="true">{topAnimal.emoji}</span>
                        <div>
                          <p className="font-bold">
                            {t(`animals.${topAnimal.id}.name`)}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-0.5">
                            {((topAnimal.count / stats.totalAnalyses) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("stats.distribution")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {sorted.map((animal, rank) => (
                      <motion.div key={animal.id} variants={itemVariants}>
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-xs text-muted-foreground text-right">
                            {rank + 1}
                          </span>
                          <span className="text-xl" aria-hidden="true">{animal.emoji}</span>
                          <span className="w-20 text-xs font-medium truncate">
                            {t(`animals.${animal.id}.name`)}
                          </span>
                          <Progress
                            value={(animal.count / maxCount) * 100}
                            className="flex-1 h-2"
                            style={{ "--progress-color": animal.color } as CSSProperties}
                          />
                          <span className="w-14 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                            {animal.count.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
