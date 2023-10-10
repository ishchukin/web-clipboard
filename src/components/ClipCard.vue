<script setup lang="ts">
import { computed, ref } from 'vue'
import { VCard, VTabs, VTab, VWindow, VWindowItem, VCardText } from 'vuetify/components'
import { type Clip } from '../model/clip'
import ClipText from './ClipText.vue'
import ClipImage from './ClipImage.vue'
import ClipHtml from './ClipHtml.vue'

const props = defineProps<{
  clip: Clip
}>()

const components: Record<string, any> = {
  ['text/plain']: ClipText,
  ['text/html']: ClipHtml,
  ['image/png']: ClipImage
}
const tab = ref<string | null>(null)
const views = computed(() => Array.from(props.clip.views.keys()))
const copy = () => {
  if (!tab.value) {
    return
  }
  const view = props.clip.views.get(tab.value!)!
  navigator.clipboard.write([
    new ClipboardItem({
      [view.blob.type]: view.blob
    })
  ])
}
</script>

<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-tabs v-model="tab">
        <v-tab v-for="view in views" :key="view" :value="view" class="pa-1 text-overline">
          {{ view }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab" class="pa-2" @click="copy">
        <v-window-item
          v-for="view in views"
          :key="view"
          :value="view"
          height="fit-content"
          width="fit-content"
        >
          <component :is="components[view]" :view="clip.views.get(view)" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
