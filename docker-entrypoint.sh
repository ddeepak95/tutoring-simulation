#!/bin/sh
set -e

# Seed the persistent volume with the transcripts baked into the image on first boot only,
# so annotator exports (written next to each transcript) survive redeploys.
if [ ! -d /data/runs ]; then
  echo "seeding /data/runs from image..."
  mkdir -p /data
  cp -r /app/runs /data/runs
fi

exec "$@"
