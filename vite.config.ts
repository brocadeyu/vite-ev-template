import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'
import simpleHtmlPlugin from 'vite-plugin-simple-html'
import eslint from 'vite-plugin-eslint'
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    viteExternalsPlugin({
      cesium: 'Cesium'
    }),
    simpleHtmlPlugin({
      minify: true,
      inject: {
        tags: [
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: '/lib/Cesium/Widgets/widgets.css'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/Cesium.js'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/CesiumEMMPExtensions.js'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/CesiumEMMTExtensions.js'
            }
          },
          {
            tag: 'scripts',
            attrs: {
              src: '/lib/Cesium/CesiumEMBBExtensions.js'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/CesiumEMGEExtensions.js'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/CesiumVideoFusion.js'
            }
          },
          {
            tag: 'script',
            attrs: {
              src: '/lib/Cesium/CesiumExternal.js'
            }
          }
        ]
      }
    }),
    // htmlConfig({
    //   scripts: [
    //     {
    //       src: '/lib/Cesium/Cesium.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumEMMPExtensions.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumEMMTExtensions.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumEMBBExtensions.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumEMGEExtensions.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumVideoFusion.js',
    //     },
    //     {
    //       src: '/lib/Cesium/CesiumExternal.js',
    //     },
    //   ],
    //   links: [
    //     {
    //       rel: 'stylesheet',
    //       href: '/lib/Cesium/Widgets/widgets.css',
    //     },
    //   ],
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts'
    }),
    ElementPlus({})
  ],
  server: {
    // http://localhost:5173/api/login -> http://localhost:3001/login
    proxy: {
      '/test': 'http://localhost:3000'
      // '/test': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true
      // }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
