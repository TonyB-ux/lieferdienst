// eslint.config.mjs
import next from "eslint-config-next";

export default [
  ...next,
  {
    rules: {
      // Fehler -> AUS (oder setze auf "warn", wenn du nur Warnungen willst)
      "@typescript-eslint/no-explicit-any": "off",
      // Optional: das <img>-Hint nur als Warnung (nicht build-blockend)
      "@next/next/no-img-element": "warn",
    },
  },
];
