import React from "react";

const MessagesTable = ({ messages, onSelect, currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
      </li>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Next button
    pages.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </li>
    );

    return pages;
  };

  return (
    <div className="card messages-table rounded-4 shadow-sm h-100">
      <div className="card-header bg-white border-0 py-3 px-4">
        <h5 className="mb-0 fw-bold">Messages Reçus</h5>
      </div>
      <div className="card-body p-0 flex-grow-1 d-flex flex-column">
        <div className="table-responsive flex-grow-1">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3 fw-semibold">ID</th>
                <th className="px-4 py-3 fw-semibold">Nom</th>
                <th className="px-4 py-3 fw-semibold d-none d-md-table-cell">Email</th>
                <th className="px-4 py-3 fw-semibold d-none d-lg-table-cell">Date</th>
                <th className="px-4 py-3 fw-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr
                  key={`${msg.id}-${index}`}
                  onClick={() => onSelect(msg)}
                  className={`message-row ${onSelect && msg.id === messages.find(m => m.id === msg.id)?.id ? 'selected' : ''}`}
                  style={{ cursor: "pointer" }}
                >
                  <td className="px-4 py-3">
                    <span className="fw-semibold text-primary">#{msg.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="fw-medium">{msg.name}</div>
                    <small className="text-muted d-md-none">{msg.email}</small>
                  </td>
                  <td className="px-4 py-3 d-none d-md-table-cell text-muted">{msg.email}</td>
                  <td className="px-4 py-3 d-none d-lg-table-cell text-muted">
                    <small>{msg.date}</small>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge rounded-pill ${msg.status === 'Lu' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {msg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer bg-white border-0 py-3">
            <nav>
              <ul className="pagination pagination-sm justify-content-center mb-0">
                {renderPagination()}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTable;
