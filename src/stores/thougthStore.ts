import Thought from '@/common/class/thought'
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
    persist: true //开启持久存储，保证刷新可以重新加载想定数据
  }
)
