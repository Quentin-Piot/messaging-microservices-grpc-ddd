module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: [
    "@quentinpiot/eslint-config/base.js",
    "plugin:@tanstack/query/recommended",
    "plugin:react-hooks/recommended"
  ],
  root: true,
  env: {
    node: true,
  },
  plugins: ["react-hooks",
    "react-refresh",
    "@tanstack/query"],
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "react-refresh/only-export-components" :"off"
  },
};

