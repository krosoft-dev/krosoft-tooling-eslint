import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
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
    {
      ignores: [
        "dist",
        "build",
        "coverage",
        "public/**",
        "*.config.ts",
        "*.config.js",
      ],
    },

    js.configs.recommended,

    ...tseslint.configs.strictTypeChecked.map((config) => ({
      ...config,
      files: ["**/*.{ts,tsx}"],
    })),

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
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",

        "@typescript-eslint/no-misused-promises": [
          "error",
          { checksVoidReturn: { attributes: false } },
        ],

        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/no-deprecated": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/strict-boolean-expressions": [
          "warn",
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
          },
        ],

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
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
          },
          { selector: "typeLike", format: ["PascalCase"] },
          {
            selector: "enumMember",
            format: ["UPPER_CASE", "PascalCase"],
          },
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: { regex: "^I[A-Z]", match: false },
          },
          {
            selector: ["objectLiteralProperty", "typeProperty"],
            format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
          },
          {
            selector: ["objectLiteralProperty", "typeProperty"],
            filter: { regex: "^[^a-zA-Z_$]|[^a-zA-Z0-9_$]", match: true },
            format: null,
          },
          {
            selector: ["objectLiteralProperty", "typeProperty"],
            modifiers: ["requiresQuotes"],
            format: null,
          },
        ],

        "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-debugger": "error",
        "no-alert": "error",
        "no-var": "error",
        "prefer-const": "error",
        eqeqeq: ["error", "always"],
        "no-param-reassign": "error",

        curly: ["warn", "all"],
        "prefer-arrow-callback": "warn",
        "prefer-template": "warn",
        "no-nested-ternary": "warn",
        "no-unneeded-ternary": "warn",
        "no-else-return": "warn",
        "no-lonely-if": "warn",
        "no-useless-return": "warn",
        "prefer-destructuring": ["warn", { object: true, array: false }],
        "object-shorthand": ["warn", "always"],
      },
    },
  );
}
