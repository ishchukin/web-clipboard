<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { VContainer, VSnackbar } from 'vuetify/components'
import { useClipStore } from '../stores/clips'
import ClipCard from '../components/ClipCard.vue'
import { type ClipView } from '../model/clip'

const clipStore = useClipStore()
const errorMessage = ref('')
const showError = ref(false)

const onPaste = async (event: ClipboardEvent) => {
  try {
    const permission = await navigator.permissions.query({ 
      name: 'clipboard-read' as PermissionName 
    })
    
    if (permission.state === 'denied') {
      throw new Error('Clipboard access denied')
    }

    const pasted = await navigator.clipboard.read()
    
    for (const entry of pasted) {
      const views = new Map<string, ClipView>()
      
      for (const entryType of entry.types) {
        const blob = await entry.getType(entryType)
        if (blob.size > 10 * 1024 * 1024) {
          console.warn(`Skipping large ${entryType} blob: ${blob.size} bytes`)
          continue
        }
        
        views.set(entryType, { blob })
      }
      
      if (views.size > 0) {
        clipStore.addClip({
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          views
        })
      }
    }
    
    event.preventDefault()
  } catch (error) {
    console.error('Failed to read clipboard:', error)
    errorMessage.value = `Failed to paste: ${error instanceof Error ? error.message : 'Unknown error'}`
    showError.value = true
  }
}
const pasteEventOptions = { capture: true }

onMounted(() => {
  document.addEventListener('paste', onPaste, pasteEventOptions)
})

onUnmounted(() => {
  document.removeEventListener('paste', onPaste, pasteEventOptions)
})
</script>

<template>
  <v-container>
    <v-snackbar v-model="showError" color="error" timeout="3000">
      {{ errorMessage }}
    </v-snackbar>
    <div class="d-flex flex-wrap justify-start align-content-start">
      <ClipCard
        v-for="clip in clipStore.clips"
        :key="clip.id"
        :clip="clip"
        class="ma-2"
        @delete="clipStore.removeClip(clip.id)"
      />
    </div>
  </v-container>
</template>