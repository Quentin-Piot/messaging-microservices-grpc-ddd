const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn", "simple-import-sort", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "prettier/prettier": ["error", { singleQuote: false }],
    "quotes": ["error", "double", { avoidEscape: true }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ['^@nestjs','^nestjs'],

            ['^node:', '^@?[a-z]'],

            ['^@quentinpiot/'],

            ['^@/','^[..]', '^[.]'],

          ]
        }
      ],
      "simple-import-sort/exports": "error",
    },
};
