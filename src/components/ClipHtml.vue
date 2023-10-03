<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { type ClipView } from '../model/clip'

const props = defineProps<{
  view: ClipView
}>()

const text = ref(URL.createObjectURL(props.view.blob))

onUnmounted(() => {
  URL.revokeObjectURL(text.value)
})
</script>

<template>
  <iframe :src="text" class="iframe-clip"> </iframe>
</template>

<style lang="scss" scoped>
.iframe-clip {
  pointer-events: none;
  height: calc(30vw);
  width: calc(30vw);
}
</style>
