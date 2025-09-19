import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { dir, t } = useLanguage();
  const alignClass = dir === 'rtl' ? 'text-end' : 'text-start';

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = t('faq.items');

  return (
    <section className="py-5">
      {/* Header */}
      <div className={`d-flex align-items-start justify-content-between mb-5 ${alignClass}`}>
        <h2 className="fw-semibold fs-3 text-primary col-12 col-lg-5">
          {t('faq.heading')}
        </h2>
        <p className="text-dark col-12 col-lg-5 fs-5 text-end mt-3 mt-lg-0">
          {t('faq.subheading')}
        </p>
      </div>

      {/* List */}
      <div className="mb-5">
        <div className="rounded-3">
          {faqItems.map((item, index) => {
            const itemIndex = `${index}`;
            const isOpen = openIndex === itemIndex;
              const contentId = `faq-content-${index}`;
            return (
              <div
                key={index}
                className={`p-3 ${index !== faqItems.length - 1 ? 'border-bottom' : ''} faq-item`}
                role="button"
                  onClick={() => toggle(itemIndex)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                style={{ cursor: 'pointer' }}
              >
                <div className={`d-flex justify-content-between align-items-center ${alignClass}`}>
                  <span className="fw-semibold text-dark mb-3">{item.question}</span>
                  <FiChevronDown className={`text-primary chev ${isOpen ? 'open' : ''}`} />
                </div>
                  <div id={contentId} className={`answer ${isOpen ? 'open' : ''}`}>
                    <p className="text-muted mb-0">{item.answer}</p>
                  </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local styles */}
      <style jsx>{`
        .faq-item:hover { background-color: var(--bs-light); }
        .chev { transition: transform 0.2s ease; }
        .chev.open { transform: rotate(180deg); }
        .answer { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 250ms ease, opacity 200ms ease, margin-top 200ms ease; margin-top: 0; }
        .answer.open { max-height: 500px; opacity: 1; margin-top: .5rem; }
      `}</style>
    </section>
  );
};

export default FAQ;
