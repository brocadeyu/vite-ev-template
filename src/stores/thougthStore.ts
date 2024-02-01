import Thought from '@/class/thought'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useThoughtStore = defineStore('thought', () => {
  const _thoughts = ref({})
  function initThoughtStore(list) {
    list.forEach((_) => {
      const t = new Thought(_)
      _thoughts.value[_.name] = t
    })
  }

  return { _thoughts, initThoughtStore }
})
