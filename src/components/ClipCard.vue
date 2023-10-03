<script setup lang="ts">
import { computed, ref } from 'vue'
import { VCard, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/components'
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
const tab = ref(null)
const views = computed(() => Array.from(props.clip.views.keys()))
</script>

<template>
  <v-card>
    <template v-slot:text>
      <v-tabs v-model="tab">
        <v-tab v-for="view in views" :key="view">
          {{ view }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="view in views" :key="view" height="fit-content" width="fit-content">
          <component :is="components[view]" :view="clip.views.get(view)" />
        </v-window-item>
      </v-window>
    </template>
  </v-card>
</template>
