<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { VContainer } from 'vuetify/components'
import { useClipStore } from '../stores/clips'
import ClipCard from '../components/ClipCard.vue'
import { type ClipView } from '../model/clip'

const clipStore = useClipStore()

const onPaste = async (a: Event) => {
  console.log(a)
  const pasted = await navigator.clipboard.read()
  for (const entry of pasted) {
    console.log(entry)
    const views = new Map<string, ClipView>()
    for (const entryType of entry.types) {
      const view = {
        blob: await entry.getType(entryType)
      }
      views.set(entryType, view)
    }
    clipStore.clips.push({ views })
  }
  a.preventDefault()
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
  <v-container full-height class="d-flex flex-wrap justify-start align-content-start grid-list-md">
    <ClipCard
      height="fit-content"
      width="fit-content"
      max-width="80vw"
      max-height="80vw"
      class="ma-2 pa-2"
      v-for="(clip, index) in clipStore.clips"
      :clip="clip"
      :key="index"
    />
  </v-container>
</template>
