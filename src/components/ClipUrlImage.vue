<script setup lang="ts">
import { type ClipUrlImage } from '../model/clip'
defineProps<{
  clip: ClipUrlImage
}>()
</script>

<template>
  <img :src="clip.url" class="logo" />
</template>

<style scoped lang="scss">
img {
  width: 64px;
  height: 64px;
}
</style>
