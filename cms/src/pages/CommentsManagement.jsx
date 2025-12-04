import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiCheck, FiX, FiTrash2, FiMessageSquare } from 'react-icons/fi';

const CommentsManagement = () => {
  const { apiCall } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'pending',
    articleId: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedComment, setSelectedComment] = useState(null);
  const commentsPerPage = 20;

  useEffect(() => {
    fetchComments();
  }, [currentPage, filters]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: commentsPerPage,
        ...(filters.status && { status: filters.status }),
        ...(filters.articleId && { articleId: filters.articleId })
      });

      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/comments?${params}`
      );

      if (!response.ok) throw new Error('Failed to fetch comments');

      const data = await response.json();
      setComments(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCommentStatus = async (id, status) => {
    try {
      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/comments/${id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        }
      );

      if (!response.ok) throw new Error('Failed to update comment status');

      fetchComments();
      alert(`Comment ${status} successfully!`);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/comments/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete comment');

      fetchComments();
      alert('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: 'badge-success',
      pending: 'badge-warning',
      rejected: 'badge-danger',
      spam: 'badge-dark'
    };
    return badges[status] || 'badge-secondary';
  };

  return (
    <div className="comments-management">
      <div className="comments-header">
        <h2>Comments Management</h2>
        <div className="stats">
          <span>Total: {comments.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="loading">Loading comments...</div>
      ) : (
        <>
          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">No comments found</div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <div className="comment-author">
                      <strong>{comment.author_name}</strong>
                      <span className="email">{comment.author_email}</span>
                    </div>
                    <div className="comment-meta">
                      <span className={`badge ${getStatusBadge(comment.status)}`}>
                        {comment.status}
                      </span>
                      <span className="date">{formatDate(comment.created_at)}</span>
                    </div>
                  </div>

                  <div className="comment-article">
                    <FiMessageSquare />
                    <span>Article: {comment.article_title || `#${comment.article_id}`}</span>
                  </div>

                  <div className="comment-content">
                    {comment.content}
                  </div>

                  <div className="comment-actions">
                    {comment.status !== 'approved' && (
                      <button
                        className="btn-icon btn-success"
                        onClick={() => updateCommentStatus(comment.id, 'approved')}
                        title="Approve"
                      >
                        <FiCheck /> Approve
                      </button>
                    )}
                    {comment.status !== 'rejected' && (
                      <button
                        className="btn-icon btn-warning"
                        onClick={() => updateCommentStatus(comment.id, 'rejected')}
                        title="Reject"
                      >
                        <FiX /> Reject
                      </button>
                    )}
                    {comment.status !== 'spam' && (
                      <button
                        className="btn-icon btn-dark"
                        onClick={() => updateCommentStatus(comment.id, 'spam')}
                        title="Mark as Spam"
                      >
                        Spam
                      </button>
                    )}
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(comment.id)}
                      title="Delete"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentsManagement;
