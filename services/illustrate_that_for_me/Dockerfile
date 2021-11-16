FROM bearstech/node:16

ARG UID=1001
RUN useradd demo --uid ${UID} --shell /bin/bash

USER demo

COPY service.js mashup.js /demo/
COPY node_modules/ /demo/node_modules

WORKDIR /demo

ENV HOST=0.0.0.0
CMD ["node", "service.js"]
