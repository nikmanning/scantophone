-- Create a storage bucket for avatars if it doesn't exist
-- Note: This needs to be run by a superuser or someone with the right permissions
BEGIN;
  -- Check if the bucket already exists
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM storage.buckets
      WHERE name = 'avatars'
    ) THEN
      -- Create the bucket
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('avatars', 'avatars', true);
      
      -- Set up public access policy
      INSERT INTO storage.policies (name, definition, bucket_id)
      VALUES (
        'Public Access',
        '{"Version": "2012-10-17", "Statement": [{"Effect": "Allow", "Principal": {"AWS": ["*"]}, "Action": ["s3:GetObject"], "Resource": ["arn:aws:s3:::avatars/*"]}]}',
        'avatars'
      );
    END IF;
  END $$;
COMMIT;
