module.exports = {
  extends: ["semistandard", "plugin:prettier/recommended", "universe/native"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowTernary: true,
        allowShortCircuit: true,
      },
    ],
  },
};
