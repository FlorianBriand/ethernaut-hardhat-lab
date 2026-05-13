FROM mcr.microsoft.com/devcontainers/javascript-node:22

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        curl \
        python3 \
        make \
        g++ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Yarn installé en root AVANT le switch user
RUN npm install -g yarn@latest

WORKDIR /workspace

ENV npm_config_update_notifier=false \
    npm_config_fund=false \
    NODE_ENV=development