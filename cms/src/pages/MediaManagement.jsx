import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUpload, FiTrash2, FiImage, FiVideo, FiFile, FiEdit2 } from 'react-icons/fi';

const MediaManagement = () => {
  const { apiCall } = useAuth();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filters, setFilters] = useState({
    fileType: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadData, setUploadData] = useState({
    articleId: '',
    altText: '',
    caption: ''
  });
  const mediaPerPage = 20;

  useEffect(() => {
    fetchMedia();
  }, [currentPage, filters]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: mediaPerPage,
        ...(filters.fileType && { fileType: filters.fileType })
      });

      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/media?${params}`
      );

      if (!response.ok) throw new Error('Failed to fetch media');

      const data = await response.json();
      setMedia(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    if (uploadData.articleId) formData.append('articleId', uploadData.articleId);
    if (uploadData.altText) formData.append('altText', uploadData.altText);
    if (uploadData.caption) formData.append('caption', uploadData.caption);

    try {
      const response = await apiCall(
        'http://localhost:5000/api/blog/admin/media/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload file');
      }

      const result = await response.json();
      alert('File uploaded successfully!');
      
      // Reset form
      setSelectedFile(null);
      setUploadData({ articleId: '', altText: '', caption: '' });
      document.getElementById('file-input').value = '';
      
      // Refresh media list
      fetchMedia();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const response = await apiCall(
        `http://localhost:5000/api/blog/admin/media/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete media');

      fetchMedia();
      alert('Media deleted successfully!');
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': return <FiImage />;
      case 'video': return <FiVideo />;
      case 'document': return <FiFile />;
      default: return <FiFile />;
    }
  };

  return (
    <div className="media-management">
      <div className="media-header">
        <h2>Media Library</h2>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <h3>Upload New File</h3>
        <form onSubmit={handleUpload}>
          <div className="form-row">
            <div className="form-group file-input-group">
              <label htmlFor="file-input">
                <FiUpload /> Choose File
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                accept="image/*,video/*,.pdf"
              />
              {selectedFile && <span className="file-name">{selectedFile.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Article ID (optional)"
                value={uploadData.articleId}
                onChange={(e) => setUploadData({ ...uploadData, articleId: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                placeholder="Alt Text (for images)"
                value={uploadData.altText}
                onChange={(e) => setUploadData({ ...uploadData, altText: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Caption"
                value={uploadData.caption}
                onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={uploading || !selectedFile}>
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>

        <div className="upload-info">
          <small>
            <strong>Supported formats:</strong> Images (JPG, PNG, GIF, WebP, SVG - max 5MB), 
            Videos (MP4, WebM, OGG - max 100MB), PDF (max 10MB)
          </small>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>File Type:</label>
          <select
            value={filters.fileType}
            onChange={(e) => setFilters({ ...filters, fileType: e.target.value })}
          >
            <option value="">All Files</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="loading">Loading media...</div>
      ) : (
        <>
          <div className="media-grid">
            {media.length === 0 ? (
              <div className="no-media">No media files found</div>
            ) : (
              media.map((item) => (
                <div key={item.id} className="media-card">
                  <div className="media-preview">
                    {item.file_type === 'image' ? (
                      <img src={`http://localhost:5000${item.file_path}`} alt={item.alt_text || item.original_filename} />
                    ) : (
                      <div className="file-icon">
                        {getFileIcon(item.file_type)}
                      </div>
                    )}
                  </div>

                  <div className="media-info">
                    <div className="media-name" title={item.original_filename}>
                      {item.original_filename}
                    </div>
                    <div className="media-meta">
                      <span className="file-type">{item.file_type}</span>
                      <span className="file-size">{formatFileSize(item.file_size)}</span>
                    </div>
                    {item.alt_text && (
                      <div className="media-alt">Alt: {item.alt_text}</div>
                    )}
                  </div>

                  <div className="media-actions">
                    <button
                      className="btn-small btn-copy"
                      onClick={() => copyToClipboard(item.file_path)}
                      title="Copy URL"
                    >
                      Copy URL
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(item.id, item.original_filename)}
                      title="Delete"
                    >
                      <FiTrash2 />
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

export default MediaManagement;
