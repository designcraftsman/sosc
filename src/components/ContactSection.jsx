import React from "react";

const ContactSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-6">
            <h3 className="fw-bold mb-4">Contactez-nous</h3>
            <p><strong>Adresse :</strong> Résidence Louma, IMM G1, Etg 1 Apprt 263, BD Palestine, Mohammedia. Maroc</p>
            <p><strong>Email :</strong> <a href="mailto:sosccarl@gmail.com">sosccarl@gmail.com</a></p>
            <p><strong>Téléphone :</strong></p>
            <p>+212 529 555 101</p>
            <p>+212 703 17 18 08</p>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nom" required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Objet" required />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="5" placeholder="Votre message" required></textarea>
              </div>
              <button type="submit" className="btn btn-success">Soumettre</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
