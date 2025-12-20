import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/*.min.js', '**/index.html', '**/package-lock.json'],
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: {
      js,
      vue: pluginVue,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    extends: ['js/recommended', 'vue/flat/essential', prettierConfig],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'no-console': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'warn',
      curly: 'warn',
      'no-else-return': 'warn',
      'no-unused-vars': 'off',
      'object-property-newline': 'warn',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true,
      },
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
  },
]);
