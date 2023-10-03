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
  <img :src="text" class="clip-img" />
</template>

<style lang="scss" scoped>
.clip-img {
  width: 100%;
}
</style>
