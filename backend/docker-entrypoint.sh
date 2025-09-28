#!/bin/sh
set -e

echo "Waiting for database..."
until npx prisma migrate deploy; do
  echo "Prisma migrate not ready, retrying in 3s..."
  sleep 3
done

echo "Running seed..."
npm run db:seed || true

echo "Starting server..."
node dist/src/index.js


