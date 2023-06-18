<script setup lang="ts">
import { type ClipText } from '../model/clip'
const props = defineProps<{
    clip: ClipText
}>()
</script>

<template>
    <p>{{ props.clip.text }}</p>
</template>
