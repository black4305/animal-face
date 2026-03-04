import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("terms.pageTitle")}</title>
        <meta name="description" content={t("terms.pageDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://animal-face.quizlab.me/terms" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-2">{t("terms.title")}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t("terms.lastUpdated")}</p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.acceptance.heading")}</h2>
            <p>{t("terms.acceptance.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.entertainment.heading")}</h2>
            <p className="mb-2">{t("terms.entertainment.body1")}</p>
            <p>{t("terms.entertainment.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.noWarranty.heading")}</h2>
            <p className="mb-2">{t("terms.noWarranty.body1")}</p>
            <p>{t("terms.noWarranty.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.ip.heading")}</h2>
            <p className="mb-2">{t("terms.ip.body1")}</p>
            <p>{t("terms.ip.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.acceptableUse.heading")}</h2>
            <p className="mb-3">{t("terms.acceptableUse.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("terms.acceptableUse.rule1")}</li>
              <li>{t("terms.acceptableUse.rule2")}</li>
              <li>{t("terms.acceptableUse.rule3")}</li>
              <li>{t("terms.acceptableUse.rule4")}</li>
              <li>{t("terms.acceptableUse.rule5")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.thirdParty.heading")}</h2>
            <p className="mb-3">{t("terms.thirdParty.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("terms.thirdParty.mediapipe")}</li>
              <li>{t("terms.thirdParty.adsense")}</li>
              <li>{t("terms.thirdParty.neon")}</li>
              <li>{t("terms.thirdParty.vercel")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.liability.heading")}</h2>
            <p className="mb-2">{t("terms.liability.body1")}</p>
            <p>{t("terms.liability.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.indemnification.heading")}</h2>
            <p>{t("terms.indemnification.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.governing.heading")}</h2>
            <p>{t("terms.governing.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.changes.heading")}</h2>
            <p className="mb-2">{t("terms.changes.body1")}</p>
            <p>{t("terms.changes.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("terms.contact.heading")}</h2>
            <p className="mb-2">{t("terms.contact.body")}</p>
            <p>
              <a href="mailto:contact@quizlab.me" className="underline underline-offset-4 hover:text-foreground">
                contact@quizlab.me
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
