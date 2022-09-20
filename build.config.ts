import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  rollup: {
    emitCJS: true,
    replace: {
      include: 'src/**',
      exclude: 'src/__tests__/**',
    },
  },
  declaration: true,
  clean: true,
})
