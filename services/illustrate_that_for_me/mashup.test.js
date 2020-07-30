const mashup = require("./mashup");

test("dandelion knows Stallman", () => {
  return mashup
    .dandelion(
      'Richard Stallman : "il faut éliminer Facebook qui entrave les libertés"'
    )
    .then((d) => {
      expect(d.annotations[0].categories).toContain("Hacker");
    });
});

test("giphy rulez", () => {
    return mashup.giphy('rulez').then((g) => {
        console.log(g);
        expect(g.data[0].images.downsized_small).toBeDefined();
    });
});

test("illustrate", () => {
  return mashup.illustrate_that_for_me(`Linus Torvalds : « Vos limitations matérielles ne devraient pas être un problème pour le reste d'entre nous »`).then((i) => {
    expect(i.label).toBe("Linus Torvalds");
  });
});