FROM python:3.11-slim

RUN pip install --no-cache-dir uv

WORKDIR /app
COPY pyproject.toml README.md ./
COPY src ./src
COPY runs ./runs

RUN uv pip install --system --no-cache -e ".[annotation]"

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV ANNOTATION_HOST=0.0.0.0 \
    ANNOTATION_PORT=8080 \
    ANNOTATION_RUNS_ROOT=/data/runs/annotating \
    ANNOTATION_DB=/data/annotations.sqlite3

EXPOSE 8080
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["tutoring-annotate"]
