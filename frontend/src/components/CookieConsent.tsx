import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const STORAGE_KEY = "animal-face-cookie-consent";

function getInitialVisibility() {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(getInitialVisibility);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {t("cookie.message")}{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {t("cookie.learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleDecline}
            className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors"
          >
            {t("cookie.decline")}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-foreground px-3 py-1 text-xs text-background hover:opacity-90 transition-opacity"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
