<script setup lang="ts">
import { ClipType, type Clip } from '../model/clip'
import ClipUrlImage from './ClipUrlImage.vue'
import ClipText from './ClipText.vue'
import { computed } from 'vue'

const props = defineProps<{
  clip: Clip
}>()

const components: Record<ClipType, any> = {
  [ClipType.Text]: ClipText,
  [ClipType.UrlImage]: ClipUrlImage
}

const narrow = computed(() => ({
  is: components[props.clip.type],
  clip: props.clip
}))
</script>

<template>
  <article>
    <component :is="narrow.is" :clip="narrow.clip" />
  </article>
</template>
