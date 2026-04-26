-- Algoryme Admin Database Schema
-- Copy and paste this entire script into Supabase SQL Editor

-- 1. CREATE PROJECTS TABLE
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  technologies VARCHAR(500)[] DEFAULT ARRAY[]::VARCHAR(500)[],
  link VARCHAR(500),
  demo_link VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREATE CONTACT_MESSAGES TABLE
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CREATE INDEXES FOR BETTER QUERY PERFORMANCE
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- 4. ENABLE ROW LEVEL SECURITY (RLS) - For security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 5. CREATE POLICIES (Optional - for now, admin has full access)
-- You can customize these later based on your auth requirements

-- 6. CREATE STORAGE BUCKET FOR PROJECT IMAGES
-- Note: You'll need to create this via Supabase UI or use the following if RLS is enabled:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', false);

-- 7. SAMPLE DATA (Optional - uncomment to add sample projects)
-- INSERT INTO projects (title, description, technologies, link, demo_link, status) VALUES
-- (
--   'E-commerce Platform',
--   'A full-stack e-commerce solution with payment integration and real-time inventory management.',
--   ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
--   'https://github.com/algoryme/ecommerce',
--   'https://ecommerce-demo.algoryme.com',
--   'active'
-- ),
-- (
--   'AI Chat Application',
--   'Real-time chat application powered by AI for intelligent responses and recommendations.',
--   ARRAY['React', 'Node.js', 'OpenAI API', 'Socket.io'],
--   'https://github.com/algoryme/ai-chat',
--   'https://ai-chat.algoryme.com',
--   'active'
-- );
