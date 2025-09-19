import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ctaBg from "../assets/images/bg/about.jpg";
import { useLanguage } from "../context/LanguageContext";

const LegalMentions = () => {
	const { t, dir } = useLanguage();
	const headings = t("legalMentionsPage.headings");
	const identification = t("legalMentionsPage.identification");
	const activityParagraphs = t("legalMentionsPage.activityParagraphs");
	const personalDataParagraphs = t("legalMentionsPage.personalDataParagraphs");
	const intellectualPropertyParagraph = t(
		"legalMentionsPage.intellectualPropertyParagraph"
	);

	return (
		<>
			<Navbar />
			<Header
				title={t("pages.legalMentions.headerTitle")}
				text={t("pages.legalMentions.headerText")}
				backgroundImage={ctaBg}
				height="500px"
			/>
			<section className="py-5">
				<div className="container" dir={dir}>
					<h3 className="fs-4 text-secondary fw-semibold">
						{headings?.identification}
					</h3>
					<ul className={dir === "rtl" ? "pe-4 mb-4" : "ps-4 mb-4"}>
						{Array.isArray(identification?.items) &&
							identification.items.map((it, idx) => (
								<li key={idx}>
									<strong>{it.label}:</strong> {it.value}
								</li>
							))}
					</ul>

					<h3 className="fs-4 text-secondary fw-semibold">{headings?.activity}</h3>
					{Array.isArray(activityParagraphs) &&
						activityParagraphs.map((p, i) => (
							<p key={i} className="mb-2">
								{p}
							</p>
						))}

					<h3 className="fs-4 text-secondary fw-semibold">
						{headings?.personalData}
					</h3>
					{Array.isArray(personalDataParagraphs) &&
						personalDataParagraphs.map((p, i) => (
							<p key={i} className="mb-2">
								{p}
							</p>
						))}

					<h3 className="fs-4 text-secondary fw-semibold">
						{headings?.intellectualProperty}
					</h3>
					<p>{intellectualPropertyParagraph}</p>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default LegalMentions;
