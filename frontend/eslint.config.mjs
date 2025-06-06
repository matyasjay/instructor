import js from "@eslint/js";
import importplugin from "eslint-plugin-import";
import prettierplugin from "eslint-plugin-prettier";
import reactplugin from "eslint-plugin-react";
import hooksplugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist", "src/lib/prisma/generated"] },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        ...globals.browser,
        ...globals.jest,
        ...globals.nodeBuiltin,
        ...globals.commonjs,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactplugin,
      "react-hooks": hooksplugin,
      prettier: prettierplugin,
      import: importplugin,
    },
    rules: {
      ...hooksplugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "react**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-dom/client",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-router**",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      ct: {
        version: "detect",
      },
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  },
];
