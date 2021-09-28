FROM node:14-buster-slim

ENV GHOST_CLI_VERSION 1.17.3
ENV GHOST_INSTALL /var/lib/ghost
ENV GHOST_CONTENT /var/lib/ghost/content
ENV GHOST_VERSION 4.16.0
ENV TZ Europe/Zurich

COPY .build/release $GHOST_INSTALL
RUN set -eux; \
    chown -R node:node "$GHOST_INSTALL";

VOLUME $GHOST_CONTENT

WORKDIR $GHOST_INSTALL

USER node

RUN export TZ >> /home/node/.profile

RUN yarn

EXPOSE 2368

ENTRYPOINT ["node", "index.js"]
