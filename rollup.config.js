import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import ignore from 'rollup-plugin-ignore';

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@mui/material',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  'material-react-table',
  '@js-joda/core',
  'lodash-es',
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        banner: '"use client";',
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true,
        banner: '"use client";',
      },
    ],
    external,
    plugins: [
      ignore(['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp']),
      svgr(),
      url({
        include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
        limit: 0,
        emitFiles: false,
      }),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationMap: false,
        compilerOptions: {
          allowImportingTsExtensions: false,
        },
      }),
      postcss({
        modules: true,
        extract: true,
        minimize: false,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    external,
    plugins: [dts()],
  },
];
