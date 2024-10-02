const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  testEnvironment: "node",
  transform: tsjPreset.transform,
};
