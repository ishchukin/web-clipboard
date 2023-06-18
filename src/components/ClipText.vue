<script setup lang="ts">
import { type ClipText } from '../model/clip'
defineProps<{
  clip: ClipText
}>()
</script>

<template>
  <p>{{ clip.text }}</p>
</template>
