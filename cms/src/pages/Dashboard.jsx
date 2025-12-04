import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FilterBar from "../components/FilterBar";
import MessagesTable from "../components/MessagesTable";
import { CiFileOn } from "react-icons/ci";
import MessageDetail from "../components/MessageDetail";

const Dashboard = () => {
  const { apiCall } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    email: '',
    status: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({
    id: '',
    name: '',
    email: '',
    status: ''
  });
  const [sortBy, setSortBy] = useState('date_desc');
  const messagesPerPage = 6;

  // Fetch messages from backend
  useEffect(() => {
    fetchMessages();
  }, []);

  // Apply filters and sorting when messages or appliedFilters change
  useEffect(() => {
    let filtered = [...messages];

    // Apply filters
    if (appliedFilters.id) {
      filtered = filtered.filter(msg => 
        msg.id.toString().includes(appliedFilters.id)
      );
    }
    if (appliedFilters.name) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
      );
    }
    if (appliedFilters.email) {
      filtered = filtered.filter(msg => 
        msg.email.toLowerCase().includes(appliedFilters.email.toLowerCase())
      );
    }
    if (appliedFilters.status) {
      filtered = filtered.filter(msg => 
        msg.status.toLowerCase() === appliedFilters.status.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date_asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'date_desc':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'status_read':
          return a.status === 'read' ? -1 : 1;
        case 'status_unread':
          return a.status === 'unread' ? -1 : 1;
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    setFilteredMessages(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [messages, appliedFilters, sortBy]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await apiCall('http://localhost:5000/api/contact-submissions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      
      // Transform backend data to match frontend format
      const transformedMessages = data.submissions.map(submission => ({
        id: submission.id,
        name: submission.name,
        email: submission.email,
        date: new Date(submission.submissionDate).toLocaleDateString('fr-FR'),
        status: submission.status === 'read' ? 'Lu' : 'Non lu',
        object: submission.subject || 'Aucun objet',
        content: submission.message,
        created_at: submission.submissionDate
      }));
      
      setMessages(transformedMessages);
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setExportLoading(true);
      setError(''); // Clear any previous errors
      const response = await apiCall('http://localhost:5000/api/contact-submissions/export/csv');
      
      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }
      
      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      setSuccessMessage('Export CSV réussi ! Le fichier a été téléchargé.');
      setTimeout(() => setSuccessMessage(''), 5000); // Clear after 5 seconds
      
    } catch (error) {
      console.error('Error exporting CSV:', error);
      setError('Erreur lors de l\'export CSV');
    } finally {
      setExportLoading(false);
    }
  };

  // Handle status update
  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const response = await apiCall(`http://localhost:5000/api/contact-submissions/${messageId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message status');
      }

      // Update local state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId
            ? { ...msg, status: newStatus === 'read' ? 'Lu' : 'Non lu' }
            : msg
        )
      );

      // Update selected message if it's the one being updated
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(prev => ({
          ...prev,
          status: newStatus === 'read' ? 'Lu' : 'Non lu'
        }));
      }
    } catch (error) {
      console.error('Error updating message status:', error);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  // Handle message deletion
  const deleteMessage = async (messageId) => {
    try {
      const response = await apiCall(`http://localhost:5000/api/contact-submissions/${messageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      // Remove from local state
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== messageId)
      );

      // Close message detail if the deleted message was selected
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Erreur lors de la suppression du message');
    }
  };

  // Handle filter changes (only updates the form state, doesn't apply filters)
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle search button click (applies the filters)
  const handleSearch = () => {
    setAppliedFilters({ ...filters });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    const emptyFilters = {
      id: '',
      name: '',
      email: '',
      status: ''
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const dummyMessages = [
    {
      id: 35,
      name: "Oussama Fayz",
      email: "fzoussama25@gmail.com",
      date: "01 Octobre 2023",
      status: "Non lu",
      object: "Just testing",
      content:
        "hello i was wondering what to say about that thing , so i tested this message",
      created_at: '2023-10-01T10:00:00Z'
    }
  ];

  // Use dummy data as fallback when no real data is available
  const displayMessages = messages.length > 0 ? filteredMessages : dummyMessages;

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = displayMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(displayMessages.length / messagesPerPage);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3">Chargement des messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container text-center py-5">
          <div className="alert alert-danger">
            <h4>Erreur</h4>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchMessages}>
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid px-lg-4 px-3 py-4">
        {/* Success message */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccessMessage('')}
              aria-label="Close"
            ></button>
          </div>
        )}
        
        <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClearFilters}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
        <div className="row g-4 dashboard-row">
          <div className="col-xl-7 col-lg-7 col-md-12">
            <MessagesTable 
              messages={currentMessages} 
              onSelect={setSelectedMessage}
              selectedMessage={selectedMessage}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12">
            <MessageDetail 
              message={selectedMessage} 
              onStatusUpdate={updateMessageStatus}
              onDelete={deleteMessage}
            />
          </div>
        </div>
      </div>

      {/* Floating CSV Export Button */}
      <button 
        className="btn btn-dark floating-export-btn d-flex align-items-center justify-content-center"
        onClick={exportToCSV}
        disabled={exportLoading || messages.length === 0}
        title={exportLoading ? "Export en cours..." : "Exporter les données en CSV"}
      >
        {exportLoading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          <>
            <CiFileOn size={20} className="mb-2" />
            <span className="export-text">CSV</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Dashboard;
