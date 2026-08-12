import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"dist",
			"example",
			"node_modules",
			"storybook-static",
			"playwright-report",
			"test-results",
			"tests/visual/.output",
			"*.config.js",
			"*.config.ts",
		],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	{
		files: ["scripts/**/*.js"],
		languageOptions: {
			globals: globals.node,
			sourceType: "commonjs",
		},
		rules: {
			"@typescript-eslint/no-require-imports": "off",
		},
	},
	{
		files: ["scripts/**/*.mjs", "build/**/*.ts", "*.config.mts"],
		languageOptions: {
			globals: globals.node,
			sourceType: "module",
		},
	},
	{
		files: ["src/**/*.test.{ts,tsx}", "src/setupTests.ts"],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			...reactHooks.configs["recommended-latest"].rules,
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
		},
	},
);
