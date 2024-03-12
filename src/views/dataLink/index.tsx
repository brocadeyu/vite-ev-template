import { resolveDynamicComponent, Transition } from 'vue'
import CesiumMap from '@/components/CesiumMap.vue'
import '@/transition.css'
export default defineComponent({
  name: 'DataLink',
  setup() {
    const slots = ({ Component }) => (
      <Transition name="fade" mode="out-in">
        {resolveDynamicComponent(Component)}
      </Transition>
    )
    return () => (
      <>
        <CesiumMap />
        <RouterView v-slots={slots} />
      </>
    )
  }
})
