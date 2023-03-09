-- Create Database if not exists
SELECT 'CREATE DATABASE despensa'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'despensa')\gexec