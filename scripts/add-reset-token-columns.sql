-- Migration: Add reset_token columns to users table
-- Purpose: Enable password recovery functionality
-- Date: 2025-02-01

-- Add reset_token column (stores the recovery token)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255);

-- Add reset_token_expiry column (stores when the token expires)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

-- Verify columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name IN ('reset_token', 'reset_token_expiry');
