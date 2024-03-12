import { defineComponent, resolveDynamicComponent, Transition } from 'vue'
import { RouterView } from 'vue-router'
import CesiumMap from '@/components/CesiumMap.vue'
import PopUp from '@/components/PopUp.vue'
import '@/transition.css'
export default defineComponent({
  name: 'App',
  setup() {
    const slots = (view) => (
      <Transition name="fade" mode="out-in">
        {resolveDynamicComponent(view.Component)}
      </Transition>
    )
    return () => (
      <>
        <CesiumMap />
        <RouterView v-slots={slots} />
        <PopUp />
      </>
    )
  }
})
