import React, { useRef, useEffect, useState } from 'react';
import MediaUploadModal from './MediaUploadModal';
import '../style/css/html-editor.css';

const HtmlEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaType, setMediaType] = useState('image');

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateContent();
  };

  const updateContent = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Entrez l\'URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const openMediaModal = (type) => {
    setMediaType(type);
    setShowMediaModal(true);
  };

  const handleMediaInsert = (mediaData) => {
    const { type, url, width, height, alt } = mediaData;
    
    // Save current selection
    editorRef.current?.focus();
    
    let html = '';
    if (type === 'image') {
      const widthAttr = width ? ` width="${width}"` : '';
      const heightAttr = height && height !== 'auto' ? ` height="${height}"` : '';
      const altAttr = alt ? ` alt="${alt}"` : '';
      const styleAttr = ` style="max-width: 100%; height: ${height || 'auto'}; display: block; margin: 0.5rem 0;"`;
      html = `<img src="${url}"${widthAttr}${heightAttr}${altAttr}${styleAttr} />`;
    } else if (type === 'video') {
      const widthAttr = width ? ` width="${width}"` : '';
      const heightAttr = height && height !== 'auto' ? ` height="${height}"` : '';
      const styleAttr = ` style="max-width: 100%; height: ${height || 'auto'}; display: block; margin: 0.5rem 0;"`;
      html = `<video src="${url}"${widthAttr}${heightAttr}${styleAttr} controls></video>`;
    }
    
    document.execCommand('insertHTML', false, html);
    updateContent();
  };

  const formatBlock = (tag) => {
    execCommand('formatBlock', `<${tag}>`);
  };

  return (
    <>
      <div className="html-editor border rounded">
        <div className="toolbar bg-light border-bottom p-2 d-flex flex-wrap gap-1">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('bold')} title="Gras">
            <strong>B</strong>
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('italic')} title="Italique">
            <em>I</em>
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('underline')} title="Souligné">
            <u>U</u>
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('strikeThrough')} title="Barré">
            <s>S</s>
          </button>
          
          <div className="vr mx-1"></div>
          
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => formatBlock('h1')} title="Titre 1">
            H1
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => formatBlock('h2')} title="Titre 2">
            H2
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => formatBlock('h3')} title="Titre 3">
            H3
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => formatBlock('p')} title="Paragraphe">
            P
          </button>
          
          <div className="vr mx-1"></div>
          
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('insertUnorderedList')} title="Liste à puces">
            ☰
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('insertOrderedList')} title="Liste numérotée">
            ≡
          </button>
          
          <div className="vr mx-1"></div>
          
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={insertLink} title="Insérer un lien">
            🔗
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openMediaModal('image')} title="Insérer une image">
            🖼️
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openMediaModal('video')} title="Insérer une vidéo">
            🎬
          </button>
          
          <div className="vr mx-1"></div>
          
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('justifyLeft')} title="Aligner à gauche">
            ⬅
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('justifyCenter')} title="Centrer">
            ↔
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('justifyRight')} title="Aligner à droite">
            ➡
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => execCommand('justifyFull')} title="Justifier">
            ⬌
          </button>
          
          <div className="vr mx-1"></div>
          
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => execCommand('removeFormat')} title="Effacer le formatage">
            ✖
          </button>
        </div>
        <div
          ref={editorRef}
          className="editor-content p-3"
          contentEditable
          onInput={updateContent}
          onBlur={updateContent}
          style={{
            minHeight: '300px',
            maxHeight: '500px',
            overflowY: 'auto',
            outline: 'none',
            backgroundColor: 'white'
          }}
          suppressContentEditableWarning
        />
      </div>

      {showMediaModal && (
        <MediaUploadModal
          type={mediaType}
          onClose={() => setShowMediaModal(false)}
          onInsert={handleMediaInsert}
        />
      )}
    </>
  );
};

export default HtmlEditor;

