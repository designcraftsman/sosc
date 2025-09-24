import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from "../assets/images/bg/about.jpg";
import { useLanguage } from "../context/LanguageContext";

const Terms = () => {
  const { t, dir } = useLanguage();
  const sections = t("termsPage.sections");
  const intro = t("termsPage.intro");

  return (
    <>
      <Navbar />
      <Header
        title={t("pages.terms.headerTitle")}
        text={t("pages.terms.headerText")}
        backgroundImage={ctaBg}
        height="500px"
      />

      <section className="py-5">
        <div className="container p-5" dir={dir}>
          <p className="mb-4">{intro}</p>
          {Array.isArray(sections) &&
            sections.map((sec, idx) => (
              <div key={idx} className="mb-3">
                {sec.title && (
                  <h3 className="fs-4 text-secondary fw-semibold mt-4">{sec.title}</h3>
                )}
                {sec.paragraphs &&
                  sec.paragraphs.map((p, i) => (
                    <p key={i} className="mb-2">
                      {p}
                    </p>
                  ))}
                {sec.list && (
                  <ul className={dir === "rtl" ? "pe-4" : "ps-4"}>
                    {sec.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
                {sec.after && <p className="mt-2">{sec.after}</p>}
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Terms;
