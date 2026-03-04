import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("privacy.pageTitle")}</title>
        <meta name="description" content={t("privacy.pageDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://animal-face.quizlab.me/privacy" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-2">{t("privacy.title")}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t("privacy.lastUpdated")}</p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.intro.heading")}</h2>
            <p>{t("privacy.intro.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.photos.heading")}</h2>
            <p className="mb-2">{t("privacy.photos.body1")}</p>
            <p>{t("privacy.photos.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.dataCollected.heading")}</h2>
            <p className="mb-3">{t("privacy.dataCollected.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("privacy.dataCollected.ip")}</li>
              <li>{t("privacy.dataCollected.userAgent")}</li>
              <li>{t("privacy.dataCollected.language")}</li>
              <li>{t("privacy.dataCollected.referer")}</li>
              <li>{t("privacy.dataCollected.country")}</li>
              <li>{t("privacy.dataCollected.animalResult")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.purpose.heading")}</h2>
            <p className="mb-3">{t("privacy.purpose.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("privacy.purpose.analytics")}</li>
              <li>{t("privacy.purpose.stats")}</li>
              <li>{t("privacy.purpose.abuse")}</li>
              <li>{t("privacy.purpose.improve")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.cookies.heading")}</h2>
            <p className="mb-2">{t("privacy.cookies.body1")}</p>
            <p className="mb-2">{t("privacy.cookies.adsense")}</p>
            <p>{t("privacy.cookies.optOut")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.thirdParty.heading")}</h2>
            <p className="mb-3">{t("privacy.thirdParty.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("privacy.thirdParty.google")}</li>
              <li>{t("privacy.thirdParty.neon")}</li>
              <li>{t("privacy.thirdParty.vercel")}</li>
              <li>{t("privacy.thirdParty.cloudflare")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.retention.heading")}</h2>
            <p className="mb-2">{t("privacy.retention.body1")}</p>
            <p>{t("privacy.retention.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.rights.heading")}</h2>
            <p className="mb-3">{t("privacy.rights.body")}</p>
            <h3 className="text-base font-semibold text-foreground mb-2">{t("privacy.rights.gdpr.heading")}</h3>
            <p className="mb-3">{t("privacy.rights.gdpr.body")}</p>
            <h3 className="text-base font-semibold text-foreground mb-2">{t("privacy.rights.ccpa.heading")}</h3>
            <p>{t("privacy.rights.ccpa.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.security.heading")}</h2>
            <p>{t("privacy.security.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.children.heading")}</h2>
            <p>{t("privacy.children.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.changes.heading")}</h2>
            <p>{t("privacy.changes.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("privacy.contact.heading")}</h2>
            <p className="mb-2">{t("privacy.contact.body")}</p>
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
