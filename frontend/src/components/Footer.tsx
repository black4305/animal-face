import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { PawPrint } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto w-full">
      <Separator />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <PawPrint className="size-4" />
          <span className="text-sm font-medium">
            {t("footer.title")}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("footer.copyright")}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {t("footer.disclaimer")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            {t("nav.privacy")}
          </Link>
          <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            {t("nav.terms")}
          </Link>
          <Link to="/about" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            {t("nav.about")}
          </Link>
          <Link to="/contact" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
