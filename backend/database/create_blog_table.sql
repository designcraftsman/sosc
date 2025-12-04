-- Create the blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) CHECK (category IS NULL OR category IN ('crédit', 'recouvrement', 'formation')),
    tags TEXT[], -- Array of tags
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_at ON blog_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created_at ON blog_articles(created_at DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_blog_articles_updated_at ON blog_articles;
CREATE TRIGGER trigger_update_blog_articles_updated_at
    BEFORE UPDATE ON blog_articles
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_articles_updated_at();

-- Insert sample data (optional)
INSERT INTO blog_articles (title, excerpt, content, author, category, tags, status, published_at) VALUES 
(
    'Les avantages du crédit professionnel pour votre entreprise',
    'Découvrez comment un crédit professionnel peut aider votre entreprise à se développer et à prospérer.',
    '<h2>Introduction</h2><p>Le crédit professionnel est un outil essentiel pour les entreprises...</p><h2>Les principaux avantages</h2><p>1. Financement de la croissance...</p>',
    'SOSC Admin',
    'crédit',
    ARRAY['crédit', 'entreprise', 'financement'],
    'published',
    CURRENT_TIMESTAMP
),
(
    'Comment améliorer la gestion du recouvrement de créances',
    'Les meilleures pratiques pour optimiser votre processus de recouvrement de créances.',
    '<h2>Stratégies efficaces</h2><p>Le recouvrement de créances est crucial pour maintenir la santé financière...</p>',
    'SOSC Admin',
    'recouvrement',
    ARRAY['recouvrement', 'créances', 'gestion'],
    'published',
    CURRENT_TIMESTAMP
)
ON CONFLICT DO NOTHING;
