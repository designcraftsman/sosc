-- Create the blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
    parent_comment_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, spam
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the blog_media table for uploaded files
CREATE TABLE IF NOT EXISTS blog_media (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES blog_articles(id) ON DELETE SET NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- image, video, document
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL, -- in bytes
    width INTEGER, -- for images/videos
    height INTEGER, -- for images/videos
    duration INTEGER, -- for videos (in seconds)
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_comments_article_id ON blog_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_media_article_id ON blog_media(article_id);
CREATE INDEX IF NOT EXISTS idx_blog_media_file_type ON blog_media(file_type);
CREATE INDEX IF NOT EXISTS idx_blog_media_created_at ON blog_media(created_at DESC);

-- Add embedded_videos column to blog_articles if needed
ALTER TABLE blog_articles 
ADD COLUMN IF NOT EXISTS embedded_videos TEXT[]; -- Array of embedded video URLs

-- Create function to update comments updated_at
CREATE OR REPLACE FUNCTION update_blog_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for comments
DROP TRIGGER IF EXISTS trigger_update_blog_comments_updated_at ON blog_comments;
CREATE TRIGGER trigger_update_blog_comments_updated_at
    BEFORE UPDATE ON blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_comments_updated_at();

-- Insert sample comments
INSERT INTO blog_comments (article_id, author_name, author_email, content, status) VALUES 
(1, 'Ahmed Ben Ali', 'ahmed@example.com', 'Article très intéressant! Merci pour les informations.', 'approved'),
(1, 'Fatma Gharbi', 'fatma@example.com', 'Pouvez-vous donner plus de détails sur les taux d''intérêt?', 'approved'),
(2, 'Mohamed Trabelsi', 'mohamed@example.com', 'Excellents conseils pour le recouvrement!', 'approved')
ON CONFLICT DO NOTHING;
