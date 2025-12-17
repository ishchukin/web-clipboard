<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { 
  VCard, VTabs, VTab, VWindow, VWindowItem, 
  VCardText, VBtn, VIcon, VCardActions, VFadeTransition, VSpacer
} from 'vuetify/components'
import { type Clip } from '../model/clip'
import ClipText from './ClipText.vue'
import ClipImage from './ClipImage.vue'
import ClipHtml from './ClipHtml.vue'

const props = defineProps<{
  clip: Clip
}>()

const emit = defineEmits<{
  delete: []
}>()

const tab = ref<string | null>(null)
const showCopiedFeedback = ref(false)

const views = computed(() => Array.from(props.clip.views.keys()))
const defaultTab = computed(() => views.value[0] || null)

watch(views, () => {
  if (!tab.value && defaultTab.value) {
    tab.value = defaultTab.value
  }
}, { immediate: true })

const copy = async () => {
  if (!tab.value) return
  
  try {
    const view = props.clip.views.get(tab.value)
    if (!view) return
    
    await navigator.clipboard.write([
      new ClipboardItem({
        [view.blob.type]: view.blob
      })
    ])
    
    showCopiedFeedback.value = true
    setTimeout(() => {
      showCopiedFeedback.value = false
    }, 2000)
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const formatTimestamp = computed(() => {
  return new Date(props.clip.timestamp).toLocaleTimeString()
})

const ComponentMap: Record<string, any> = {
  'text/plain': ClipText,
  'text/html': ClipHtml,
  'image/png': ClipImage,
  'image/jpeg': ClipImage,
  'image/gif': ClipImage,
  'image/webp': ClipImage,
}
</script>

<template>
  <v-card class="clip-card" width="300" max-width="100%">
    <v-card-text class="py-2 px-4 text-caption text-grey">
      {{ formatTimestamp }}
    </v-card-text>
    
    <v-tabs v-model="tab" density="compact" class="px-2">
      <v-tab 
        v-for="viewType in views" 
        :key="viewType" 
        :value="viewType"
        class="text-caption"
      >
        {{ viewType.split('/').pop() }}
      </v-tab>
    </v-tabs>
    
    <v-card-text class="pa-2 content-area" @click="copy">
      <v-window v-model="tab">
        <v-window-item
          v-for="viewType in views"
          :key="viewType"
          :value="viewType"
        >
          <component 
            :is="ComponentMap[viewType]" 
            :view="clip.views.get(viewType)"
            :type="viewType"
          />
        </v-window-item>
      </v-window>
      
      <v-fade-transition>
        <div 
          v-if="showCopiedFeedback"
          class="copied-feedback text-center text-caption text-success"
        >
          ✓ Copied
        </div>
      </v-fade-transition>
    </v-card-text>
    
    <v-card-actions class="px-2 py-1">
      <v-btn 
        size="small" 
        variant="text" 
        color="primary"
        @click.stop="copy"
      >
        <v-icon small>mdi-content-copy</v-icon>
        Copy
      </v-btn>
      <v-spacer />
      <v-btn 
        size="small" 
        variant="text" 
        color="error"
        @click.stop="emit('delete')"
      >
        <v-icon small>mdi-delete</v-icon>
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.clip-card {
  transition: transform 0.2s;
}

.clip-card:hover {
  transform: translateY(-2px);
}

.content-area {
  min-height: 100px;
  max-height: 400px;
  overflow: auto;
  cursor: pointer;
  position: relative;
}

.content-area:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.copied-feedback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 4px;
  pointer-events: none;
}
</style>