/bin/bash

set -e

LOG_FILE="/var/log/project-bootstrap.log"

touch "$LOG_FILE"

echo "Project bootstrap check: $(date -u '+%Y-%m-%dT%H:%M:%SZ')" >> "$LOG_FILE"
