-- ─── Documents Storage Bucket ────────────────────────────────────────────────
-- Creates a public Supabase Storage bucket for scoring guideline documents.
-- Files in this bucket are publicly readable (no auth required to download).
-- Uploads require the service role key (done via API routes with auth checks).

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  52428800,  -- 50 MB limit per file
  ARRAY[
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/msword'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access (anyone can download)
CREATE POLICY "Public read access for documents"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'documents');

-- Allow authenticated uploads via service role (enforced at API layer)
CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'documents');

-- Allow authenticated users to update/replace documents
CREATE POLICY "Authenticated users can update documents"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'documents');

-- Allow authenticated users to delete documents
CREATE POLICY "Authenticated users can delete documents"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'documents');
