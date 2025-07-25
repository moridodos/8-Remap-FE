import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    rules: {},
  },
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    parserOptions: {
      project: './tsconfig.json',
      createDefaultProgram: true,
    },
    env: {
      // 전역객체를 eslint가 인식하는 구간
      browser: true, // document나 window 인식되게 함
      node: true,
      es6: true,
    },
    globals: {
      React: 'writable',
    },
    ignorePatterns: [
      'node_modules/',
      'postcss.config.mjs',
      'eslint.config.mjs',
    ], // eslint 미적용될 폴더나 파일 명시
    extends: [
      'next', // next.js 기본 eslint
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@next/next/recommended', // next 권장
      'plugin:@typescript-eslint/recommended', // ts 권장
      'prettier', // eslint-config-prettier prettier와 중복된 eslint 규칙 제거
      'plugin:import/recommended',
      'plugin:import/typescript',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'eslint-config-prettier',
    ],
    settings: {
      'import/resolver': {
        typescript: {},
      },
      'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
    },
    rules: {
      // "no-unused-vars": "off",
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off', // react 17부턴 import 안해도돼서 기능 끔
      // 경고표시, 파일 확장자를 .ts나 .tsx 모두 허용함
      'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
      'react/function-component-definition': [
        2,
        { namedComponents: ['arrow-function', 'function-declaration'] },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
          ],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'external',
              position: 'before',
            },
            { pattern: '@*', group: 'external', position: 'after' },
            { pattern: '@*/**', group: 'external', position: 'after' },
            { pattern: 'components/**', group: 'external', position: 'after' },
            { pattern: 'styles/**', group: 'external', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
