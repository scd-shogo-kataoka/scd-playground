import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
})

// export default async () => {
//   const { key, cert } = await devcert.certificateFor('localhost')

//   return {
//     plugins: [remix(), tsconfigPaths()],
//     server: {
//       https: {
//         key,
//         cert,
//       },
//     },
//   }
// }

// export default async (): Promise<UserConfigExport> => {
//   const { key, cert } = await devcert.certificateFor('localhost')
