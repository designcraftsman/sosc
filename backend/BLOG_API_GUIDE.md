# Blog API Documentation

## Overview
This API provides complete blog functionality for the SOSC website, including article management, categories, tags, and search capabilities.

## Database Setup

Run the migration to create the blog tables:
```bash
node src/run-blog-migration.js
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Get Published Articles
```
GET /api/blog/articles
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Article Title",
      "slug": "article-title",
      "excerpt": "Brief description...",
      "content": "<p>Full HTML content...</p>",
      "author": "SOSC Admin",
      "featured_image": "https://example.com/image.jpg",
      "category": "Crédit",
      "tags": ["crédit", "entreprise"],
      "status": "published",
      "views": 150,
      "published_at": "2024-11-15T10:00:00.000Z",
      "created_at": "2024-11-15T09:00:00.000Z",
      "updated_at": "2024-11-15T09:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "hasMore": true
  }
}
```

#### 2. Get Article by Slug
```
GET /api/blog/articles/:slug
```
**Response:**
```json
{
  "success": true,
  "data": {
    "article": { /* article object */ },
    "relatedArticles": [ /* array of related articles */ ]
  }
}
```

#### 3. Get Featured Articles
```
GET /api/blog/articles/featured?limit=3
```

#### 4. Search Articles
```
GET /api/blog/articles/search?q=crédit&limit=10
```

#### 5. Get All Categories
```
GET /api/blog/articles/categories
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "Crédit",
      "count": "5"
    },
    {
      "category": "Recouvrement",
      "count": "3"
    }
  ]
}
```

#### 6. Get All Tags
```
GET /api/blog/articles/tags
```

### Admin Endpoints (Authentication Required)

All admin endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 1. Get All Articles (Including Drafts)
```
GET /api/blog/admin/articles
```
**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (draft, published, archived)
- `category` (optional): Filter by category

#### 2. Get Article by ID
```
GET /api/blog/admin/articles/:id
```

#### 3. Create Article
```
POST /api/blog/admin/articles
```
**Request Body:**
```json
{
  "title": "Article Title",
  "slug": "article-title",
  "excerpt": "Brief description",
  "content": "<h2>Introduction</h2><p>Content...</p>",
  "featuredImage": "https://example.com/image.jpg",
  "category": "Crédit",
  "tags": ["crédit", "entreprise", "financement"],
  "status": "published"
}
```

**Notes:**
- `slug` is optional - if not provided, it will be auto-generated from the title
- `status` can be: `draft`, `published`, or `archived`
- `author` is automatically set from the authenticated user

#### 4. Update Article
```
PUT /api/blog/admin/articles/:id
```
**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "slug": "updated-slug",
  "excerpt": "Updated excerpt",
  "content": "<p>Updated content...</p>",
  "featuredImage": "https://example.com/new-image.jpg",
  "category": "Recouvrement",
  "tags": ["recouvrement", "créances"],
  "status": "published"
}
```

#### 5. Delete Article
```
DELETE /api/blog/admin/articles/:id
```

## Article Model

### Fields:
- **id**: Unique identifier (auto-generated)
- **title**: Article title (required)
- **slug**: URL-friendly identifier (required, unique)
- **excerpt**: Brief description (optional)
- **content**: Full HTML content (required)
- **author**: Author name (required)
- **featured_image**: URL to featured image (optional)
- **category**: Category name (optional)
- **tags**: Array of tags (optional)
- **status**: Publication status - `draft`, `published`, or `archived` (default: draft)
- **views**: View count (auto-incremented)
- **published_at**: Publication timestamp (auto-set when status changes to published)
- **created_at**: Creation timestamp (auto-generated)
- **updated_at**: Last update timestamp (auto-updated)

## Features

### 1. Automatic Slug Generation
If a slug is not provided, it will be automatically generated from the title:
- Converts to lowercase
- Removes accents
- Replaces spaces and special characters with hyphens

### 2. View Tracking
Article views are automatically incremented when fetched by slug on the public endpoint.

### 3. Related Articles
When fetching an article by slug, the API also returns related articles from the same category.

### 4. Full-Text Search
Search across title, content, excerpt, and tags using the search endpoint.

### 5. Category & Tag Management
Automatically track and retrieve all categories and tags with article counts.

## Error Responses

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common Error Codes:**
- `400`: Bad Request - Invalid data
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error

## Examples

### Creating a Blog Post (Admin)
```bash
curl -X POST http://localhost:5000/api/blog/admin/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Les avantages du crédit professionnel",
    "excerpt": "Découvrez comment un crédit peut aider votre entreprise",
    "content": "<h2>Introduction</h2><p>Le crédit professionnel...</p>",
    "category": "Crédit",
    "tags": ["crédit", "entreprise"],
    "status": "published"
  }'
```

### Fetching Published Articles (Public)
```bash
curl http://localhost:5000/api/blog/articles?page=1&limit=10&category=Crédit
```

### Searching Articles (Public)
```bash
curl http://localhost:5000/api/blog/articles/search?q=recouvrement
```

## Security

- Admin endpoints are protected by JWT authentication
- Only administrators can create, update, or delete articles
- Public endpoints only return published articles
- Content should be sanitized before storage (implement HTML sanitization in production)

## Next Steps

1. **Image Upload**: Implement image upload functionality for featured images
2. **Rich Text Editor**: Integrate a rich text editor in the CMS
3. **Comments**: Add comment functionality for articles
4. **SEO**: Add meta tags and descriptions for better SEO
5. **Analytics**: Track more detailed analytics (time spent, bounce rate, etc.)
