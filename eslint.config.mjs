import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'cypress/**',
  ]),
  {
    plugins: {
      '@stylistic': stylistic,
      'no-relative-import-paths': noRelativeImportPaths,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'no-relative-import-paths/no-relative-import-paths': [
        'error', 
        { 
          allowSameFolder: false,
          rootDir: 'src',
          prefix: '@'
        }
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'

    }
  }
])

export default eslintConfig
