import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from "../assets/images/bg/about.jpg";
import { useLanguage } from "../context/LanguageContext";

const Policy = () => {
  const { t, dir } = useLanguage();
  return (
    <>
      <Navbar />
      <Header
        title={t("pages.policy.headerTitle")}
        text={t("pages.policy.headerText")}
        backgroundImage={ctaBg}
        height="500px"
      />
      <section className="py-5">
        <div className="container" dir={dir}>
          <p className="mb-0">{t("policyPage.paragraph")}</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Policy;
