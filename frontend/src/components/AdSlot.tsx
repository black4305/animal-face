import { useEffect } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const STORAGE_KEY = "animal-face-cookie-consent";

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
}

export function AdSlot({
  slot = "0000000000",
  format = "auto",
  className,
}: AdSlotProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent !== "accepted") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not loaded yet
    }
  }, [slot]);

  const consent = typeof window !== "undefined"
    ? localStorage.getItem(STORAGE_KEY)
    : null;

  return (
    <div
      className={
        className ??
        "mx-auto my-2 flex w-full max-w-xl flex-col items-center justify-center px-4 py-2"
      }
    >
      {consent === "accepted" ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-0000000000000000"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <span className="text-[10px] text-muted-foreground/30">
          {t("ad.sponsored")}
        </span>
      )}
    </div>
  );
}
