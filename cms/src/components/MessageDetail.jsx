import React, { useState } from "react";

const MessageDetail = ({ message, onStatusUpdate, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(message.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!message) {
    return (
      <div className="card message-detail rounded-4 shadow-sm h-100 d-flex align-items-center justify-content-center">
        <div className="text-center p-5">
          <div className="mb-3">
            <svg width="64" height="64" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </div>
          <h6 className="text-muted mb-2">Aucun message sélectionné</h6>
          <p className="text-muted small mb-0">Sélectionnez un message dans la liste pour voir les détails</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card message-detail rounded-4 shadow-sm h-100 d-flex flex-column">
      {/* Header */}
      <div className="card-header bg-gradient-primary text-white border-0 py-3 px-4">
        <div className="d-flex align-items-center gap-3">
          <div className="message-id-badge">
            <span className="fw-bold">#{message.id}</span>
          </div>
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-semibold">{message.name}</h6>
            <small className="opacity-90">{message.email}</small>
          </div>
        </div>
      </div>

      {/* Subject and Date */}
      <div className="subject-section px-4 py-3 bg-light border-bottom">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
          <div className="flex-grow-1">
            <small className="text-muted text-uppercase d-block mb-1" style={{fontSize: '0.7rem', letterSpacing: '0.5px'}}>Objet</small>
            <p className="mb-0 fw-semibold">{message.object}</p>
          </div>
          <div className="text-muted">
            <small>
              <i className="far fa-calendar-alt me-1"></i>
              {message.date}
            </small>
          </div>
        </div>
      </div>

      {/* Message Content with Scroll */}
      <div className="card-body px-4 py-3 flex-grow-1 d-flex flex-column">
        <small className="text-muted text-uppercase mb-2" style={{fontSize: '0.7rem', letterSpacing: '0.5px'}}>Message</small>
        <div className="message-content flex-grow-1">
          <p className="mb-0">{message.content}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-footer bg-white border-0 py-3 px-4">
        <div className="row g-3">
          <div className="col-sm-6">
            <button 
              className="btn btn-respond rounded-pill px-4 fw-semibold w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.object}`)}
            >
              <i className="far fa-envelope"></i>
              <span>Répondre</span>
            </button>
          </div>
          <div className="col-sm-6">
            <button 
              className="btn btn-delete rounded-pill px-4 fw-semibold w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleDeleteClick}
            >
              <i className="far fa-trash-alt"></i>
              <span>Supprimer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title">
                  <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                  Confirmer la suppression
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCancelDelete}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">
                  Êtes-vous sûr de vouloir supprimer ce message ?
                </p>
                <div className="bg-light p-3 rounded">
                  <small className="text-muted">Message de:</small>
                  <div className="fw-bold">{message.name} ({message.email})</div>
                  <small className="text-muted">Objet:</small>
                  <div>{message.object}</div>
                </div>
                <p className="text-danger mt-3 mb-0">
                  <small>
                    <i className="fas fa-info-circle me-1"></i>
                    Cette action est irréversible.
                  </small>
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button 
                  type="button" 
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={handleCancelDelete}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger rounded-pill px-4"
                  onClick={handleConfirmDelete}
                >
                  <i className="fas fa-trash me-2"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDetail;
