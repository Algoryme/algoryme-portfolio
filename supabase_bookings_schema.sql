-- Supabase booking table schema

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  service_type VARCHAR(100) NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Optional: enable row-level security if you use RLS in Supabase
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Optional: add policies for authenticated/admin users if needed
-- Example policy to allow authenticated users to insert booking requests:
-- CREATE POLICY "Allow booking creation" ON bookings
--   FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');

-- Example policy to allow admin select/update/delete:
-- CREATE POLICY "Admin access to bookings" ON bookings
--   FOR ALL
--   USING (auth.role() = 'authenticated' AND auth.email() = 'admin@example.com');
