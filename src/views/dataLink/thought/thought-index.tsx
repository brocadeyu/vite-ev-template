import { resolveDynamicComponent, Transition } from 'vue'
import ThoughtHeader from '@/views/dataLink/thought/components/thought-header.vue'
import ToolTip from '@/components/ToolTip.vue'
import PopUp from '@/components/PopUp.vue'
import '@/transition.css'
export default defineComponent({
  name: 'ThoughtIndex',
  setup() {
    const slots = ({ Component }) => (
      <Transition name="fade" mode="out-in">
        {resolveDynamicComponent(Component)}
      </Transition>
    )
    return () => (
      <div>
        <ThoughtHeader />
        <ToolTip />
        <PopUp />
        <RouterView v-slots={slots} />
      </div>
    )
  }
})
