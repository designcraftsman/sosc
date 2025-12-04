import React, { useState, useRef } from 'react';
import { MdClose, MdCloudUpload, MdImage, MdVideoLibrary } from 'react-icons/md';
import '../style/css/media-upload-modal.css';

const MediaUploadModal = ({ onClose, onInsert, type = 'image' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [altText, setAltText] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const fileType = file.type.split('/')[0];
    
    if (type === 'image' && fileType !== 'image') {
      alert('Veuillez sélectionner un fichier image');
      return;
    }
    
    if (type === 'video' && fileType !== 'video') {
      alert('Veuillez sélectionner un fichier vidéo');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlInput(url);
    setPreviewUrl(url);
  };

  const handleInsert = () => {
    const finalUrl = uploadMode === 'url' ? urlInput : previewUrl;
    
    if (!finalUrl) {
      alert('Veuillez sélectionner un fichier ou entrer une URL');
      return;
    }

    const mediaData = {
      type,
      url: finalUrl,
      file: selectedFile,
      width: width || (type === 'image' ? '100%' : '100%'),
      height: height || 'auto',
      alt: altText || ''
    };

    onInsert(mediaData);
    onClose();
  };

  return (
    <div className="media-upload-modal-overlay" onClick={onClose}>
      <div className="media-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>
            {type === 'image' ? (
              <>
                <MdImage className="me-2" />
                Insérer une Image
              </>
            ) : (
              <>
                <MdVideoLibrary className="me-2" />
                Insérer une Vidéo
              </>
            )}
          </h4>
          <button className="btn-close" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Upload Mode Tabs */}
          <div className="upload-mode-tabs mb-3">
            <button
              className={`tab-btn ${uploadMode === 'file' ? 'active' : ''}`}
              onClick={() => setUploadMode('file')}
            >
              Télécharger un Fichier
            </button>
            <button
              className={`tab-btn ${uploadMode === 'url' ? 'active' : ''}`}
              onClick={() => setUploadMode('url')}
            >
              URL
            </button>
          </div>

          {uploadMode === 'file' ? (
            /* File Upload Area */
            <div
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="file-input"
                accept={type === 'image' ? 'image/*' : 'video/*'}
                onChange={handleChange}
              />
              
              {!previewUrl ? (
                <div className="upload-prompt">
                  <MdCloudUpload size={64} className="upload-icon" />
                  <p className="upload-text">
                    Glissez et déposez votre {type === 'image' ? 'image' : 'vidéo'} ici
                  </p>
                  <p className="upload-subtext">ou cliquez pour parcourir</p>
                  <p className="upload-formats">
                    {type === 'image' 
                      ? 'PNG, JPG, GIF, WebP jusqu\'à 10MB' 
                      : 'MP4, WebM, OGG jusqu\'à 50MB'}
                  </p>
                </div>
              ) : (
                <div className="preview-container">
                  {type === 'image' ? (
                    <img src={previewUrl} alt="Preview" className="preview-image" />
                  ) : (
                    <video src={previewUrl} controls className="preview-video" />
                  )}
                  <button
                    className="btn btn-sm btn-danger change-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setPreviewUrl('');
                    }}
                  >
                    Changer le fichier
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* URL Input */
            <div className="url-input-container">
              <input
                type="url"
                className="form-control mb-3"
                placeholder={`Entrez l'URL de ${type === 'image' ? 'l\'image' : 'la vidéo'}`}
                value={urlInput}
                onChange={handleUrlChange}
              />
              {previewUrl && (
                <div className="preview-container">
                  {type === 'image' ? (
                    <img src={previewUrl} alt="Preview" className="preview-image" />
                  ) : (
                    <video src={previewUrl} controls className="preview-video" />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Size Controls */}
          {previewUrl && (
            <div className="size-controls mt-3">
              <h6 className="mb-2">Dimensions</h6>
              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label small">Largeur</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Auto"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <span className="input-group-text">px ou %</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Hauteur</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Auto"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <span className="input-group-text">px ou %</span>
                  </div>
                </div>
              </div>
              
              {type === 'image' && (
                <div className="mt-2">
                  <label className="form-label small">Texte alternatif</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Description de l'image"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                  />
                </div>
              )}

              <div className="preset-sizes mt-2">
                <small className="text-muted">Tailles prédéfinies:</small>
                <div className="d-flex gap-2 mt-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => { setWidth('100%'); setHeight('auto'); }}
                  >
                    Pleine largeur
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => { setWidth('50%'); setHeight('auto'); }}
                  >
                    Demi-largeur
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => { setWidth('300px'); setHeight('auto'); }}
                  >
                    Petite
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => { setWidth('600px'); setHeight('auto'); }}
                  >
                    Moyenne
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleInsert}
            disabled={!previewUrl}
          >
            Insérer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;
