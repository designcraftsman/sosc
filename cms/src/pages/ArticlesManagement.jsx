import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiPlus, FiEye, FiTrash2 } from 'react-icons/fi';
import { BiSort } from 'react-icons/bi';

const ArticlesManagement = () => {
  const { apiCall } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('created_at_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const articlesPerPage = 10;

  useEffect(() => {
    fetchArticles();
  }, [currentPage, filters, sortBy]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: articlesPerPage,
        ...(filters.status && { status: filters.status }),
        ...(filters.category && { category: filters.category })
      });

      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/articles?${params}`
      );

      if (!response.ok) throw new Error('Failed to fetch articles');

      const data = await response.json();
      setArticles(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/articles/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete article');

      fetchArticles();
      alert('Article deleted successfully!');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    }
  };

  const handleEdit = (article) => {
    navigate(`/articles/${article.id}`);
  };

  const handleView = (article) => {
    navigate(`/articles/${article.id}`);
  };

  const handleCreate = () => {
    navigate('/articles/new');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="articles-management container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestion des Articles</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          <FiPlus className="me-2" /> Nouvel Article
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Statut:</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Tous</option>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
                <option value="archived">Archivé</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Catégorie:</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Toutes les Catégories</option>
                <option value="Crédit">Crédit</option>
                <option value="Recouvrement">Recouvrement</option>
                <option value="Formation">Formation</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Trier par:</label>
              <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at_desc">Plus Récent</option>
                <option value="created_at_asc">Plus Ancien</option>
                <option value="views_desc">Plus Consulté</option>
                <option value="title_asc">Titre A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Statut</th>
                    <th>Vues</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">Aucun article trouvé</td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.title}</td>
                        <td>{article.category || '-'}</td>
                        <td>
                          <span className={`badge bg-${article.status === 'published' ? 'success' : article.status === 'draft' ? 'warning' : 'secondary'}`}>
                            {article.status === 'published' ? 'Publié' : article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                          </span>
                        </td>
                        <td>{article.views}</td>
                        <td>{formatDate(article.created_at)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleView(article)}
                            title="View/Edit"
                          >
                            <FiEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(article.id)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">Page {currentPage} sur {totalPages}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

// Article Editor Component
const ArticleEditor = ({ article, onClose }) => {
  const { apiCall } = useAuth();
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || '',
    tags: article?.tags?.join(', ') || '',
    featuredImage: article?.featured_image || '',
    embeddedVideos: article?.embedded_videos?.join('\n') || '',
    status: article?.status || 'draft'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        embeddedVideos: formData.embeddedVideos.split('\n').map(v => v.trim()).filter(v => v)
      };

      const url = article
        ? `http://localhost:5000/api/blog/admin/articles/${article.id}`
        : 'http://localhost:5000/api/blog/admin/articles';

      const response = await apiCall(url, {
        method: article ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save article');

      alert(`Article ${article ? 'updated' : 'created'} successfully!`);
      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData({ ...formData, slug });
  };

  return (
    <div className="article-editor">
      <div className="editor-header">
        <h2>{article ? 'Edit Article' : 'New Article'}</h2>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Slug *</label>
            <div className="input-with-button">
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <button type="button" onClick={generateSlug} className="btn-small">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows="3"
            placeholder="Brief description of the article..."
          />
        </div>

        <div className="form-group">
          <label>Content (HTML) *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="15"
            required
            placeholder="<h2>Your content here...</h2><p>Write HTML content...</p>"
          />
          <small>Use HTML tags for formatting. Upload images separately and insert their URLs.</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select category</option>
              <option value="Crédit">Crédit</option>
              <option value="Recouvrement">Recouvrement</option>
              <option value="Formation">Formation</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="crédit, finance, entreprise"
          />
        </div>

        <div className="form-group">
          <label>Featured Image URL</label>
          <input
            type="text"
            value={formData.featuredImage}
            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
            placeholder="/uploads/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Embedded Video URLs (one per line)</label>
          <textarea
            value={formData.embeddedVideos}
            onChange={(e) => setFormData({ ...formData, embeddedVideos: e.target.value })}
            rows="3"
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          />
          <small>Supports YouTube, Vimeo, Dailymotion</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticlesManagement;
