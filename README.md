Demo of api mashup with node
============================

The mashup part
---------------

Dummy REST API that mix text analysis and illustrations services.

Go get your own API keys:

 * Look for [Create an App] on Giphy : https://developers.giphy.com/docs/api#quick-start-guide
 * "Get started with a Free Account" on Dandelion : https://dandelion.eu/accounts/register/?next=/docs/

Export them as Env :

    export DANDELION_TOKEN=YOUR_OWN_TOKEN
    export GIPHY_TOKEN=YOUR_OWN_GIPHY_TOKEN
    export SECRET=SOMETHING_RANDOM

And launch tests:

    cd services/illustrate_that_for_me
    yarn test

The big picture
---------------

               +---------+   +------------------------+
    browser -->| Ingress |   | illustrate_that_for_me +--> Giphy REST
               | (Nginx) +-->| (Nodejs)               +--> Dandelion REST
               |         |   +------------------------+
               |         |
               |         |   +-------+
               |         +-->| cms   |
               |         |   | (PHP) |
               +---------+   +-------+