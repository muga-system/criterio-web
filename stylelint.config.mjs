export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["theme", "utility"],
      },
    ],
    "custom-property-pattern": null,
    "import-notation": "string",
    "selector-class-pattern": null,
  },
};
