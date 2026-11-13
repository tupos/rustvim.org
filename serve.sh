#!/bin/sh
set -eu

serve_repo_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
serve_image=rustvim-site

docker --context rootless build --tag "$serve_image" "$serve_repo_dir"
exec docker --context rootless run --rm --init \
    --publish 127.0.0.1:1313:1313 \
    --mount "type=bind,source=$serve_repo_dir,target=/workspace" \
    "$serve_image"
