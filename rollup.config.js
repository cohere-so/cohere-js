import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: './',
      entryFileNames: 'lib/index.js',
      format: 'cjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'types/',
        rootDir: 'src/'
      }),
    ]
  },
  {
    input: 'src/index.ts',
    output: { file: 'es/index.js', format: 'es' },
    plugins: [
      typescript(),
    ]
  },
]
