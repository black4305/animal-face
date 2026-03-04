import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("about.pageTitle")}</title>
        <meta name="description" content={t("about.pageDescription")} />
        <link rel="canonical" href="https://animal-face.quizlab.me/about" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black tracking-tight mb-8">{t("about.title")}</h1>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.quizlab.heading")}</h2>
            <p className="mb-2">{t("about.quizlab.body1")}</p>
            <p>{t("about.quizlab.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.test.heading")}</h2>
            <p className="mb-2">{t("about.test.body1")}</p>
            <p className="mb-2">{t("about.test.body2")}</p>
            <p>{t("about.test.body3")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.technology.heading")}</h2>
            <p className="mb-3">{t("about.technology.body1")}</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>{t("about.technology.step1")}</li>
              <li>{t("about.technology.step2")}</li>
              <li>{t("about.technology.step3")}</li>
              <li>{t("about.technology.step4")}</li>
            </ul>
            <p>{t("about.technology.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.animals.heading")}</h2>
            <p className="mb-3">{t("about.animals.body")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("about.animals.list.dog")}</li>
              <li>{t("about.animals.list.cat")}</li>
              <li>{t("about.animals.list.fox")}</li>
              <li>{t("about.animals.list.bear")}</li>
              <li>{t("about.animals.list.rabbit")}</li>
              <li>{t("about.animals.list.deer")}</li>
              <li>{t("about.animals.list.hamster")}</li>
              <li>{t("about.animals.list.wolf")}</li>
              <li>{t("about.animals.list.penguin")}</li>
              <li>{t("about.animals.list.owl")}</li>
              <li>{t("about.animals.list.squirrel")}</li>
              <li>{t("about.animals.list.dinosaur")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.privacy.heading")}</h2>
            <p className="mb-2">{t("about.privacy.body1")}</p>
            <p>{t("about.privacy.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.global.heading")}</h2>
            <p className="mb-2">{t("about.global.body1")}</p>
            <p>{t("about.global.body2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">{t("about.free.heading")}</h2>
            <p>{t("about.free.body")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
