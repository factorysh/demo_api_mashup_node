FROM bearstech/php:7.4

ARG UID=1001
RUN useradd demo --uid ${UID} --shell /bin/bash
COPY vendor /var/www/web/vendor
COPY index.php /var/www/web/

USER demo
