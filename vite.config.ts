import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'
import simpleHtmlPlugin from 'vite-plugin-simple-html'
import eslint from 'vite-plugin-eslint'
import gltf from 'vite-plugin-gltf'
import glsl from 'vite-plugin-glsl'
import ViteRestart from 'vite-plugin-restart'
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  // console.log(env)

  return {
    plugins: [
      vue(),
      vueJsx(),
      eslint(),
      viteExternalsPlugin({
        cesium: 'Cesium'
      }),
      gltf(),
      glsl(),
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
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        eslintrc: {
          enabled: true // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        },
        dts: 'src/types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver()
        ],
        dts: 'src/types/components.d.ts'
      }),
      Icons({
        autoInstall: true
      }),
      ElementPlus({}),
      ViteRestart({
        restart: ['.env.development', 'vite.config.ts']
      })
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
      },
      open: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    assetsInclude: ['**/*.gltf']
  }
})
