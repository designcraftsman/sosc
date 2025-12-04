import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdArrowBack, MdEdit, MdDelete, MdSave, MdClose, MdImage, MdVideoLibrary, MdInsertDriveFile, MdComment, MdCheckCircle, MdCancel, MdBlock } from "react-icons/md";
import HtmlEditor from "../components/HtmlEditor";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiCall } = useAuth();
  
  const isNewArticle = id === 'new';
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(!isNewArticle);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Edit states
  const [isEditingArticle, setIsEditingArticle] = useState(isNewArticle);
  const [editedArticle, setEditedArticle] = useState(isNewArticle ? {
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category: 'crédit',
    tags: [],
    is_featured: false
  } : null);
  
  // Media upload
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaAltText, setMediaAltText] = useState('');
  const [mediaCaption, setMediaCaption] = useState('');

  // Comments filter
  const [commentStatus, setCommentStatus] = useState('all');

  useEffect(() => {
    if (!isNewArticle) {
      fetchArticleDetails();
    }
  }, [id]);

  const fetchArticleDetails = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch article
      const articleRes = await apiCall(`http://localhost:5000/api/blog/admin/articles/${id}`, {
        method: 'GET'
      });
      
      if (articleRes.success) {
        setArticle(articleRes.data);
        setEditedArticle(articleRes.data);
      }

      // Fetch comments for this article
      const commentsRes = await apiCall(`http://localhost:5000/api/blog/admin/comments?article_id=${id}`, {
        method: 'GET'
      });
      
      if (commentsRes.success) {
        setComments(commentsRes.data.comments || []);
      }

      // Fetch media for this article
      const mediaRes = await apiCall(`http://localhost:5000/api/blog/admin/media?article_id=${id}`, {
        method: 'GET'
      });
      
      if (mediaRes.success) {
        setMedia(mediaRes.data.media || []);
      }
      
    } catch (err) {
      setError('Échec du chargement des détails de l\'article');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArticle = async () => {
    try {
      // If creating new article
      if (isNewArticle) {
        const res = await apiCall('http://localhost:5000/api/blog/admin/articles', {
          method: 'POST',
          body: JSON.stringify(editedArticle)
        });
        
        if (res.success) {
          setSuccessMessage('Article créé avec succès!');
          setTimeout(() => {
            navigate(`/articles/${res.data.id}`);
          }, 1000);
        } else {
          setError(res.message || 'Échec de la création de l\'article');
        }
        return;
      }

      // Updating existing article
      const res = await apiCall(`http://localhost:5000/api/blog/admin/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editedArticle)
      });
      
      if (res.success) {
        setArticle(res.data);
        setEditedArticle(res.data);
        setIsEditingArticle(false);
        setSuccessMessage('Article mis à jour avec succès!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(res.message || 'Échec de la mise à jour de l\'article');
      }
    } catch (err) {
      setError(isNewArticle ? 'Échec de la création de l\'article' : 'Échec de la mise à jour de l\'article');
      console.error(err);
    }
  };

  const handleDeleteArticle = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article? Cette action est irréversible.')) {
      return;
    }

    try {
      const res = await apiCall(`http://localhost:5000/api/blog/admin/articles/${id}`, {
        method: 'DELETE'
      });
      
      if (res.success) {
        navigate('/articles');
      } else {
        setError(res.message || 'Échec de la suppression de l\'article');
      }
    } catch (err) {
      setError('Échec de la suppression de l\'article');
      console.error(err);
    }
  };

  const handleUploadMedia = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setUploadingMedia(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('article_id', id);
      if (mediaAltText) formData.append('alt_text', mediaAltText);
      if (mediaCaption) formData.append('caption', mediaCaption);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/blog/admin/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const res = await response.json();
      
      if (res.success) {
        setSuccessMessage('Média téléchargé avec succès!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setSelectedFile(null);
        setMediaAltText('');
        setMediaCaption('');
        fetchArticleDetails(); // Refresh media list
      } else {
        setError(res.message || 'Échec du téléchargement du média');
      }
    } catch (err) {
      setError('Échec du téléchargement du média');
      console.error(err);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce média?')) {
      return;
    }

    try {
      const res = await apiCall(`http://localhost:5000/api/blog/admin/media/${mediaId}`, {
        method: 'DELETE'
      });
      
      if (res.success) {
        setSuccessMessage('Média supprimé avec succès!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchArticleDetails();
      } else {
        setError(res.message || 'Échec de la suppression du média');
      }
    } catch (err) {
      setError('Échec de la suppression du média');
      console.error(err);
    }
  };

  const handleUpdateCommentStatus = async (commentId, status) => {
    try {
      const res = await apiCall(`http://localhost:5000/api/blog/admin/comments/${commentId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      
      if (res.success) {
        const statusText = status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'marqué comme spam';
        setSuccessMessage(`Commentaire ${statusText} avec succès!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchArticleDetails();
      } else {
        setError(res.message || 'Échec de la mise à jour du commentaire');
      }
    } catch (err) {
      setError('Échec de la mise à jour du commentaire');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire?')) {
      return;
    }

    try {
      const res = await apiCall(`http://localhost:5000/api/blog/admin/comments/${commentId}`, {
        method: 'DELETE'
      });
      
      if (res.success) {
        setSuccessMessage('Commentaire supprimé avec succès!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchArticleDetails();
      } else {
        setError(res.message || 'Échec de la suppression du commentaire');
      }
    } catch (err) {
      setError('Échec de la suppression du commentaire');
      console.error(err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('URL copiée dans le presse-papiers!');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const getMediaIcon = (type) => {
    if (type.startsWith('image/')) return <MdImage size={40} />;
    if (type.startsWith('video/')) return <MdVideoLibrary size={40} />;
    return <MdInsertDriveFile size={40} />;
  };

  const filteredComments = commentStatus === 'all' 
    ? comments 
    : comments.filter(c => c.status === commentStatus);

  if (loading) {
    return (
      <div className="article-detail">
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isNewArticle && !article) {
    return (
      <div className="article-detail">
        <div className="container-fluid p-4">
          <div className="alert alert-danger">Article introuvable</div>
          <Link to="/articles" className="btn btn-primary">
            <MdArrowBack className="me-2" /> Retour aux Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail">
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <Link to="/articles" className="btn btn-outline-secondary">
              <MdArrowBack className="me-2" /> Retour aux Articles
            </Link>
            {isNewArticle && <h2 className="mb-0">Créer un Nouvel Article</h2>}
          </div>
          <div className="d-flex gap-2">
            {!isNewArticle && !isEditingArticle ? (
              <>
                <button className="btn btn-primary" onClick={() => setIsEditingArticle(true)}>
                  <MdEdit className="me-2" /> Modifier l'Article
                </button>
                <button className="btn btn-danger" onClick={handleDeleteArticle}>
                  <MdDelete className="me-2" /> Supprimer l'Article
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-success" onClick={handleUpdateArticle}>
                  <MdSave className="me-2" /> {isNewArticle ? 'Créer l\'Article' : 'Enregistrer'}
                </button>
                {!isNewArticle && (
                  <button className="btn btn-secondary" onClick={() => {
                    setIsEditingArticle(false);
                    setEditedArticle(article);
                  }}>
                    <MdClose className="me-2" /> Annuler
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Article Content */}
        <div className="card mb-4">
          <div className="card-body">
            {!isEditingArticle ? (
              <>
                <div className="mb-3">
                  <span className={`badge bg-${article.status === 'published' ? 'success' : article.status === 'draft' ? 'warning' : 'secondary'} me-2`}>
                    {article.status === 'published' ? 'Publié' : article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                  </span>
                  {article.is_featured && <span className="badge bg-info">À la Une</span>}
                </div>
                <h1 className="mb-3">{article.title}</h1>
                {article.excerpt && <p className="lead mb-3">{article.excerpt}</p>}
                <div className="mb-3">
                  <strong>Catégorie:</strong> {article.category || 'Aucune'}
                </div>
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-3">
                    <strong>Étiquettes:</strong>{' '}
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mb-3">
                  <strong>Contenu:</strong>
                  <div className="mt-2 p-3 border rounded" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                </div>
                <div className="text-muted small">
                  <div>Vues: {article.views || 0}</div>
                  <div>Créé: {new Date(article.created_at).toLocaleString('fr-FR')}</div>
                  <div>Modifié: {new Date(article.updated_at).toLocaleString('fr-FR')}</div>
                </div>
              </>
            ) : (
              <div>
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedArticle.title}
                    onChange={(e) => setEditedArticle({...editedArticle, title: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Extrait</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={editedArticle.excerpt || ''}
                    onChange={(e) => setEditedArticle({...editedArticle, excerpt: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contenu</label>
                  <HtmlEditor
                    value={editedArticle.content}
                    onChange={(value) => setEditedArticle({...editedArticle, content: value})}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Catégorie</label>
                    <select
                      className="form-select"
                      value={editedArticle.category || 'crédit'}
                      onChange={(e) => setEditedArticle({...editedArticle, category: e.target.value})}
                    >
                      <option value="crédit">Crédit</option>
                      <option value="recouvrement">Recouvrement</option>
                      <option value="formation">Formation</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Statut</label>
                    <select
                      className="form-select"
                      value={editedArticle.status}
                      onChange={(e) => setEditedArticle({...editedArticle, status: e.target.value})}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Étiquettes (séparées par des virgules)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedArticle.tags ? editedArticle.tags.join(', ') : ''}
                    onChange={(e) => setEditedArticle({...editedArticle, tags: e.target.value.split(',').map(t => t.trim())})}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isFeatured"
                    checked={editedArticle.is_featured || false}
                    onChange={(e) => setEditedArticle({...editedArticle, is_featured: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="isFeatured">
                    Article à la Une
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media Section - Only show for existing articles */}
        {!isNewArticle && (
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Bibliothèque de Médias</h4>
            </div>
            <div className="card-body">
              {/* Upload Form */}
              <form onSubmit={handleUploadMedia} className="mb-4 p-3 bg-light rounded">
                <h5 className="mb-3">Télécharger un Nouveau Média</h5>
                <div className="mb-3">
                  <label className="form-label">Sélectionner un Fichier</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept="image/*,video/*,.pdf"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Texte Alternatif</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mediaAltText}
                      onChange={(e) => setMediaAltText(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Légende</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mediaCaption}
                      onChange={(e) => setMediaCaption(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!selectedFile || uploadingMedia}>
                  {uploadingMedia ? 'Téléchargement...' : 'Télécharger le Média'}
                </button>
              </form>            {/* Media Grid */}
            {media.length === 0 ? (
              <p className="text-muted text-center py-4">No media uploaded yet</p>
            ) : (
              <div className="row g-3">
                {media.map((item) => (
                  <div key={item.id} className="col-md-4 col-lg-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="text-center mb-2">
                          {item.file_type.startsWith('image/') ? (
                            <img src={`http://localhost:5000${item.file_path}`} alt={item.alt_text} className="img-fluid rounded" style={{ maxHeight: '150px' }} />
                          ) : item.file_type.startsWith('video/') ? (
                            <video src={`http://localhost:5000${item.file_path}`} className="img-fluid rounded" style={{ maxHeight: '150px' }} controls />
                          ) : (
                            <div className="text-muted">{getMediaIcon(item.file_type)}</div>
                          )}
                        </div>
                        <h6 className="card-title text-truncate">{item.original_filename}</h6>
                        <p className="card-text small text-muted">
                          Size: {(item.file_size / 1024).toFixed(2)} KB<br/>
                          Type: {item.file_type.split('/')[1]}
                        </p>
                        {item.caption && <p className="small">{item.caption}</p>}
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary flex-fill"
                            onClick={() => copyToClipboard(`http://localhost:5000${item.file_path}`)}
                          >
                            Copy URL
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteMedia(item.id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}

        {/* Comments Section - Only show for existing articles */}
        {!isNewArticle && (
          <div className="card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Commentaires ({comments.length})</h4>
              <select
                className="form-select form-select-sm w-auto"
                value={commentStatus}
                onChange={(e) => setCommentStatus(e.target.value)}
              >
                <option value="all">Tous les Commentaires</option>
                <option value="pending">En Attente</option>
                <option value="approved">Approuvés</option>
                <option value="rejected">Rejetés</option>
                <option value="spam">Spam</option>
              </select>
            </div>
            <div className="card-body">
              {filteredComments.length === 0 ? (
                <p className="text-muted text-center py-4">Aucun commentaire trouvé</p>
              ) : (
              <div className="comments-list">
                {filteredComments.map((comment) => (
                  <div key={comment.id} className="comment-item border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{comment.author_name}</h6>
                        <small className="text-muted">{comment.author_email}</small>
                      </div>
                      <span className={`badge bg-${comment.status === 'approved' ? 'success' : comment.status === 'pending' ? 'warning' : comment.status === 'spam' ? 'dark' : 'danger'}`}>
                        {comment.status}
                      </span>
                    </div>
                    <p className="mb-2">{comment.content}</p>
                    <div className="text-muted small mb-2">
                      {new Date(comment.created_at).toLocaleString()}
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleUpdateCommentStatus(comment.id, 'approved')}
                        disabled={comment.status === 'approved'}
                      >
                        <MdCheckCircle className="me-1" /> Approuver
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleUpdateCommentStatus(comment.id, 'rejected')}
                        disabled={comment.status === 'rejected'}
                      >
                        <MdCancel className="me-1" /> Rejeter
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleUpdateCommentStatus(comment.id, 'spam')}
                        disabled={comment.status === 'spam'}
                      >
                        <MdBlock className="me-1" /> Spam
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <MdDelete className="me-1" /> Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
