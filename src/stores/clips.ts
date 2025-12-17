// stores/clips.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Clip } from '../model/clip'

export const useClipStore = defineStore('clips', () => {
  const clips = ref<Clip[]>([])
  const maxClips = 50
  
  const addClip = (clip: Clip) => {
    clips.value.unshift(clip)
    
    if (clips.value.length > maxClips) {
      clips.value = clips.value.slice(0, maxClips)
    }
  }
  
  const removeClip = (id: string) => {
    clips.value = clips.value.filter(clip => clip.id !== id)
  }
  
  const clearClips = () => {
    clips.value = []
  }
  
  return {
    clips,
    addClip,
    removeClip,
    clearClips
  }
})