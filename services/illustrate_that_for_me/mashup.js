const axios = require('axios');

// Entity extraction with Dandelion
async function dandelion(txt) {
  const resp = await axios
  .get("https://api.dandelion.eu/datatxt/nex/v1", {
    params: {
      token: process.env.DANDELION_TOKEN,
      html_fragment: txt,
      lang: "fr",
      "social.hashtag": "true",
      include: "types,categories",
    },
  });
  return resp.data;
}

exports.dandelion = dandelion;

// Find an ugly moving picture
async function giphy(query) {
  const resp = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: process.env.GIPHY_TOKEN,
      q: query,
      limit: "32",
      offset: "0",
      //rating: "g",
      lang: "fr",
    },
  });
  return resp.data;
}

exports.giphy = giphy;

// Extract one entity from a text, with type priorities
async function the_entity(txt, types) {
  const entities = await dandelion(txt);
  for (let type of types) {
    for (let entity of entities.annotations) {
      if (entity.types.includes(`http://dbpedia.org/ontology/${type}`)) {
        return entity;
      }
    }
  }
  // ok, there no cute entity, lets use the first, yolo
  return annotations[0];
}

// Get a pict from a text
async function illustrate_that_for_me(txt) {
  const entity = await the_entity(txt, ["Organisation", "Person", "Place", "Location"]);
  const gif = await giphy(entity.label);
  return {
    label: entity.label,
    gif: gif.data[0].images.downsized_small, 
  };
}

exports.illustrate_that_for_me = illustrate_that_for_me;