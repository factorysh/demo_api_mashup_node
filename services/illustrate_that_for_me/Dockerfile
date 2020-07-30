FROM bearstech/node:12

ARG UID=1001
RUN useradd demo --uid ${UID} --shell /bin/bash

COPY *.js /demo/
COPY node_modules /demo/

WORKDIR /demo
USER demo
CMD ["node", "service.js"]