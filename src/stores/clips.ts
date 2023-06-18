import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Stores } from '../stores'
import { type Clip } from '../model/clip'

export const useClipStore = defineStore(Stores.ClipStore, () => {
  const clips = ref<Clip[]>([]);
  return { clips }
})
