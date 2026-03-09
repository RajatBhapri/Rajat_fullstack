/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm", // <- important for ESM support
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
