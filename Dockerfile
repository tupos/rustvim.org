FROM node:24-trixie-slim AS nodejs

FROM debian:latest

ARG HUGO_VERSION=0.162.1

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl libatomic1 libstdc++6 \
    && curl -fsSL \
        "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-$(dpkg --print-architecture).deb" \
        -o /tmp/hugo.deb \
    && apt-get install -y --no-install-recommends /tmp/hugo.deb \
    && rm -rf /var/lib/apt/lists/* /tmp/hugo.deb

COPY --from=nodejs /usr/local/ /usr/local/

ENV NPM_CONFIG_CACHE=/tmp/npm-cache

WORKDIR /workspace

EXPOSE 1313

CMD ["node", "scripts/build-site.mjs", "--serve", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1313/", "--port", "1313"]
