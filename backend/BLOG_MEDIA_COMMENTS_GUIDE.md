# Blog Complete Feature Guide - Media Upload, Embedded Videos & Comments

## 📋 Overview
This guide covers the enhanced blog features including:
- File upload (images, videos, PDFs)
- Embedded videos (YouTube, Vimeo, Dailymotion)
- Comments system with moderation
- HTML editor support for article content

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install multer
```

### 2. Run Migrations
```bash
# Run blog migration first (if not done already)
node src/run-blog-migration.js

# Run comments and media migration
node src/run-comments-media-migration.js
```

### 3. Create Uploads Directory
The uploads directory will be created automatically, but you can create it manually:
```bash
mkdir uploads
```

## 📁 File Upload System

### Supported File Types

#### Images
- **Formats**: JPEG, JPG, PNG, GIF, WebP, SVG
- **Max Size**: 5 MB
- **Use Cases**: Article featured images, inline content images

#### Videos
- **Formats**: MP4, WebM, OGG, QuickTime
- **Max Size**: 100 MB
- **Use Cases**: Video content for articles

#### Documents
- **Formats**: PDF
- **Max Size**: 10 MB
- **Use Cases**: Downloadable resources

### Upload API

#### Upload File
```
POST /api/blog/admin/media/upload
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: The file to upload (required)
- `articleId`: ID of the article (optional)
- `altText`: Alternative text for images (optional)
- `caption`: Caption for the media (optional)

**Example using curl:**
```bash
curl -X POST http://localhost:5000/api/blog/admin/media/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "articleId=1" \
  -F "altText=Beautiful landscape" \
  -F "caption=Sunset in Tunisia"
```

**Example using JavaScript:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('articleId', '1');
formData.append('altText', 'Beautiful landscape');

fetch('http://localhost:5000/api/blog/admin/media/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Upload successful:', data);
  // Use data.data.file_path to insert in HTML editor
});
```

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": 1,
    "filename": "beautiful-landscape-1700000000000-abc123.jpg",
    "original_filename": "image.jpg",
    "file_path": "/uploads/beautiful-landscape-1700000000000-abc123.jpg",
    "file_type": "image",
    "mime_type": "image/jpeg",
    "file_size": 1024000,
    "alt_text": "Beautiful landscape",
    "caption": "Sunset in Tunisia",
    "created_at": "2024-11-15T10:00:00.000Z"
  }
}
```

#### Get All Media
```
GET /api/blog/admin/media?page=1&limit=20&fileType=image
Authorization: Bearer YOUR_TOKEN
```

#### Update Media Metadata
```
PUT /api/blog/admin/media/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "altText": "Updated alt text",
  "caption": "Updated caption",
  "articleId": 2
}
```

#### Delete Media
```
DELETE /api/blog/admin/media/:id
Authorization: Bearer YOUR_TOKEN
```

### Using Uploaded Images in HTML Editor

After uploading, insert the image in your HTML content:
```html
<img src="/uploads/beautiful-landscape-1700000000000-abc123.jpg" 
     alt="Beautiful landscape" 
     title="Sunset in Tunisia" />
```

## 🎥 Embedded Videos

### Supported Platforms
- YouTube
- Vimeo
- Dailymotion

### Adding Embedded Videos to Articles

When creating or updating an article, include the `embeddedVideos` array:

```json
{
  "title": "My Video Article",
  "content": "<p>Check out this video...</p>",
  "embeddedVideos": [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://vimeo.com/123456789"
  ]
}
```

### Embedding Videos in HTML Content

#### YouTube
```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

#### Vimeo
```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" 
  width="640" height="360" 
  frameborder="0" 
  allow="autoplay; fullscreen; picture-in-picture" 
  allowfullscreen>
</iframe>
```

#### Responsive Video Container
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```

## 💬 Comments System

### Public API (No Authentication)

#### Get Comments for Article
```
GET /api/blog/articles/:articleId/comments
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "article_id": 1,
      "parent_comment_id": null,
      "author_name": "Ahmed Ben Ali",
      "author_email": "ahmed@example.com",
      "content": "Great article!",
      "status": "approved",
      "created_at": "2024-11-15T10:00:00.000Z",
      "replies": [
        {
          "id": 2,
          "parent_comment_id": 1,
          "author_name": "Admin",
          "content": "Thank you!",
          "replies": []
        }
      ]
    }
  ],
  "count": 1
}
```

#### Submit Comment
```
POST /api/blog/articles/:articleId/comments
Content-Type: application/json

{
  "authorName": "Ahmed Ben Ali",
  "authorEmail": "ahmed@example.com",
  "content": "Great article! Very informative.",
  "parentCommentId": null
}
```

**Note**: Comments are created with `pending` status and require admin approval.

### Admin API (Authentication Required)

#### Get All Comments
```
GET /api/blog/admin/comments?status=pending&page=1&limit=50
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `status`: Filter by status (pending, approved, rejected, spam)
- `articleId`: Filter by article
- `page`: Page number
- `limit`: Items per page

#### Approve/Reject Comment
```
PATCH /api/blog/admin/comments/:id/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "approved"
}
```

**Valid Status Values:**
- `pending`: Awaiting moderation
- `approved`: Published on website
- `rejected`: Not published
- `spam`: Marked as spam

#### Delete Comment
```
DELETE /api/blog/admin/comments/:id
Authorization: Bearer YOUR_TOKEN
```

## 📝 HTML Editor Integration

### Recommended HTML Editor: Quill, TinyMCE, or CKEditor

#### Example with TinyMCE

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tiny.cloud/1/YOUR_API_KEY/tinymce/6/tinymce.min.js"></script>
  <script>
    tinymce.init({
      selector: '#article-content',
      height: 500,
      plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media | code',
      
      // Image upload handler
      images_upload_handler: function (blobInfo, success, failure) {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        
        fetch('http://localhost:5000/api/blog/admin/media/upload', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            success('http://localhost:5000' + result.data.file_path);
          } else {
            failure('Upload failed: ' + result.error);
          }
        })
        .catch(error => {
          failure('Upload error: ' + error.message);
        });
      }
    });
  </script>
</head>
<body>
  <textarea id="article-content"></textarea>
</body>
</html>
```

### Creating Article with HTML Content

```javascript
const createArticle = async () => {
  const htmlContent = tinymce.get('article-content').getContent();
  
  const articleData = {
    title: 'My Article',
    slug: 'my-article',
    excerpt: 'Brief description',
    content: htmlContent,
    category: 'Crédit',
    tags: ['crédit', 'finance'],
    embeddedVideos: ['https://www.youtube.com/watch?v=VIDEO_ID'],
    status: 'published'
  };
  
  const response = await fetch('http://localhost:5000/api/blog/admin/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(articleData)
  });
  
  const result = await response.json();
  console.log(result);
};
```

## 🔒 Security Considerations

### File Upload Security
1. **File Type Validation**: Only allowed file types can be uploaded
2. **File Size Limits**: Enforced at the server level
3. **Safe Filenames**: Generated using timestamp and random string
4. **Authentication Required**: Only admins can upload files

### Comment Moderation
1. **All comments start as "pending"**
2. **Content sanitization**: Dangerous HTML is removed
3. **Email validation**: Ensures valid email addresses
4. **Character limits**: Max 2000 characters per comment

### HTML Content
1. **Server-side sanitization**: Remove dangerous scripts and iframes
2. **Recommended**: Use a library like `sanitize-html` in production

## 📊 Database Schema

### blog_articles (Updated)
- Added `embedded_videos TEXT[]` - Array of video URLs

### blog_comments (New)
- Nested comments support (parent-child relationships)
- Moderation workflow (pending → approved/rejected/spam)

### blog_media (New)
- Track all uploaded files
- Store metadata (dimensions, file size, etc.)
- Link to articles

## 🎯 Complete Workflow Example

### 1. Create Article with Images and Videos
```javascript
// Step 1: Upload images
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch('/api/blog/admin/media/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  return await res.json();
};

// Step 2: Create article with uploaded image and embedded video
const createArticle = async () => {
  const imageUpload = await uploadImage(imageFile);
  
  const article = {
    title: 'Complete Guide to Business Credit',
    slug: 'business-credit-guide',
    excerpt: 'Everything you need to know about business credit',
    content: `
      <h2>Introduction</h2>
      <p>Business credit is essential for growth...</p>
      <img src="${imageUpload.data.file_path}" alt="Business meeting" />
      <h2>Watch Our Video Guide</h2>
      <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
    `,
    featuredImage: imageUpload.data.file_path,
    category: 'Crédit',
    tags: ['crédit', 'entreprise', 'guide'],
    embeddedVideos: ['https://www.youtube.com/watch?v=VIDEO_ID'],
    status: 'published'
  };
  
  await fetch('/api/blog/admin/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(article)
  });
};
```

### 2. Display Article with Comments
```javascript
// Fetch article
const article = await fetch('/api/blog/articles/business-credit-guide').then(r => r.json());

// Fetch comments
const comments = await fetch(`/api/blog/articles/${article.data.article.id}/comments`).then(r => r.json());

// Display article
document.getElementById('article').innerHTML = `
  <h1>${article.data.article.title}</h1>
  <img src="${article.data.article.featured_image}" />
  <div>${article.data.article.content}</div>
  
  <h3>Comments (${comments.count})</h3>
  ${renderComments(comments.data)}
`;

// Submit comment
const submitComment = async (content) => {
  await fetch(`/api/blog/articles/${article.data.article.id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorName: 'User Name',
      authorEmail: 'user@example.com',
      content: content
    })
  });
};
```

## 🎨 Frontend Implementation Tips

### Image Gallery for Editor
Create a media library modal where users can:
1. Upload new images
2. Browse existing uploads
3. Select and insert into editor

### Comment Component
```jsx
const CommentForm = ({ articleId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    await fetch(`/api/blog/articles/${articleId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorName: formData.get('name'),
        authorEmail: formData.get('email'),
        content: formData.get('content')
      })
    });
    
    alert('Comment submitted for moderation!');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <textarea name="content" placeholder="Your Comment" required></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
};
```

## 📦 Next Steps

1. **Install HTML sanitization library** (production):
   ```bash
   npm install sanitize-html
   ```

2. **Implement rate limiting** for comment submissions

3. **Add email notifications** for new comments to admins

4. **Create admin dashboard** for comment moderation

5. **Add image optimization** before upload (resize, compress)

6. **Implement CDN** for serving media files in production
