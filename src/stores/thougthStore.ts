import Thought from '@/class/thought'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useThoughtStore = defineStore(
  'thought',
  () => {
    const thought: Thought | null = ref(null)
    function initThoughtStore(rawThought?) {
      const t = new Thought(rawThought)
      thought.value = t
    }

    return { thought, initThoughtStore }
  },
  {
    persist: true
  }
)
