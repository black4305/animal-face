import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  topAnimalId: string;
}

export function ShareButtons({ topAnimalId }: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [instaCopied, setInstaCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://animal-face.quizlab.me";

  const animalName = t(`animals.${topAnimalId}.name`);
  const shareText = t("result.shareText", { animal: animalName });

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setInstaCopied(true);
      setTimeout(() => setInstaCopied(false), 2000);
    } catch {
      // fallback
    }
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <p className="sr-only">{t("result.share")}</p>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <div className="flex flex-col items-center gap-1">
          <TwitterShareButton url={shareUrl} title={shareText}>
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors shadow-sm">
              <TwitterIcon size={24} round={false} bgStyle={{ fill: "transparent" }} iconFillColor="currentColor" />
            </div>
          </TwitterShareButton>
          <span className="text-[10px] text-muted-foreground">Twitter</span>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <div className="flex flex-col items-center gap-1">
          <FacebookShareButton url={shareUrl} title={shareText}>
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors shadow-sm">
              <FacebookIcon size={24} round={false} bgStyle={{ fill: "transparent" }} iconFillColor="currentColor" />
            </div>
          </FacebookShareButton>
          <span className="text-[10px] text-muted-foreground">Facebook</span>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-12 shadow-sm"
            onClick={handleInstagram}
            aria-label="Share on Instagram"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Button>
          <span className="text-[10px] text-muted-foreground">
            {instaCopied ? t("share.copied") : "Instagram"}
          </span>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-12 shadow-sm"
            onClick={handleCopy}
            aria-label="Copy link"
          >
            {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
          </Button>
          <span className="text-[10px] text-muted-foreground">{copied ? t("share.copied") : t("share.copy")}</span>
        </div>
      </motion.div>
    </div>
  );
}
