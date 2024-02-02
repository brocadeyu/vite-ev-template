import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'
import simpleHtmlPlugin from 'vite-plugin-simple-html'
import eslint from 'vite-plugin-eslint'
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  // console.log(env)

  return {
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
      port: 5177,
      host: '0.0.0.0',
      // http://localhost:5177/api/login -> http://localhost:12000/login
      proxy: {
        '/api': {
          target: 'http://localhost:12000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
