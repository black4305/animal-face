import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("contact.pageTitle")}</title>
        <meta name="description" content={t("contact.pageDescription")} />
        <link rel="canonical" href="https://animal-face.quizlab.me/contact" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-8">{t("contact.title")}</h1>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.getInTouch.heading")}</h2>
            <p className="mb-2">{t("contact.getInTouch.body1")}</p>
            <p>{t("contact.getInTouch.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.email.heading")}</h2>
            <p className="mb-3">{t("contact.email.body")}</p>
            <a
              href="mailto:contact@quizlab.me"
              className="inline-block rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              contact@quizlab.me
            </a>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.feedback.heading")}</h2>
            <p className="mb-2">{t("contact.feedback.body1")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("contact.feedback.item1")}</li>
              <li>{t("contact.feedback.item2")}</li>
              <li>{t("contact.feedback.item3")}</li>
              <li>{t("contact.feedback.item4")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.dataRequests.heading")}</h2>
            <p>{t("contact.dataRequests.body")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.faq.heading")}</h2>
            <p className="mb-2">{t("contact.faq.body")}</p>
            <Link to="/" className="underline underline-offset-4 hover:text-foreground">
              {t("contact.faq.link")}
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("contact.response.heading")}</h2>
            <p>{t("contact.response.body")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
