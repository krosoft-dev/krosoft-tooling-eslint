import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

interface BaseConfigOptions {
  tsconfigRootDir: string;
  project?: string[];
}

export function createBaseConfig({
  tsconfigRootDir,
  project = ["./tsconfig.json"],
}: BaseConfigOptions): ReturnType<typeof tseslint.config> {
  return tseslint.config(
    { ignores: ["dist", "*.config.ts", "*.config.js"] },

    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    prettierConfig,
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        parser: tseslint.parser,
        parserOptions: {
          project,
          tsconfigRootDir,
        },
        globals: {
          ...globals.browser,
        },
      },
      plugins: {
        "@typescript-eslint": tseslint.plugin,
      },
      rules: {
        // TypeScript - Very Strict
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",

        // Naming Conventions
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "default",
            format: ["camelCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
          },
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            leadingUnderscore: "allow",
          },
          { selector: "import", format: ["camelCase", "PascalCase"] },
          { selector: "function", format: ["camelCase", "PascalCase"] },
          {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
          },
          { selector: "typeLike", format: ["PascalCase"] },
          { selector: "enumMember", format: ["UPPER_CASE"] },
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: { regex: "^I[A-Z]", match: false },
          },
        ],

        // Code Quality
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-debugger": "error",
        "no-alert": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-arrow-callback": "error",
        "prefer-template": "error",
        "no-nested-ternary": "error",
        "no-unneeded-ternary": "error",
        eqeqeq: ["error", "always"],
        curly: ["error", "all"],
        "no-else-return": "error",
        "no-lonely-if": "error",
        "no-useless-return": "error",
        "prefer-destructuring": ["error", { object: true, array: false }],
        "object-shorthand": ["error", "always"],
        "no-param-reassign": "error",

        "prettier/prettier": "error",
      },
    },
    eslintPluginPrettier,
  );
}
