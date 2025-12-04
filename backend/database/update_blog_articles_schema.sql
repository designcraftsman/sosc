-- Migration to remove unnecessary columns from blog_articles table

-- Remove slug column and its unique constraint and index
ALTER TABLE blog_articles DROP COLUMN IF EXISTS slug CASCADE;
DROP INDEX IF EXISTS idx_blog_articles_slug;

-- Remove featured_image column
ALTER TABLE blog_articles DROP COLUMN IF EXISTS featured_image;

-- Remove embedded_videos column
ALTER TABLE blog_articles DROP COLUMN IF EXISTS embedded_videos;

-- Update existing data to match the new category values BEFORE adding constraint
-- Update existing categories to match new lowercase values
UPDATE blog_articles SET category = 'crédit' 
WHERE category IS NOT NULL AND (LOWER(category) LIKE '%crédit%' OR LOWER(category) LIKE '%credit%');

UPDATE blog_articles SET category = 'recouvrement' 
WHERE category IS NOT NULL AND LOWER(category) LIKE '%recouvrement%';

UPDATE blog_articles SET category = 'formation' 
WHERE category IS NOT NULL AND LOWER(category) LIKE '%formation%';

-- Set any remaining non-matching categories to NULL
UPDATE blog_articles SET category = NULL 
WHERE category IS NOT NULL AND category NOT IN ('crédit', 'recouvrement', 'formation');

-- Now add the constraint after data is cleaned
ALTER TABLE blog_articles DROP CONSTRAINT IF EXISTS check_category_values;
ALTER TABLE blog_articles ADD CONSTRAINT check_category_values 
CHECK (category IS NULL OR category IN ('crédit', 'recouvrement', 'formation'));

-- Comment on the table
COMMENT ON TABLE blog_articles IS 'Blog articles with simplified schema - media and videos are embedded in content';
COMMENT ON COLUMN blog_articles.category IS 'Article category - must be one of: crédit, recouvrement, formation';
