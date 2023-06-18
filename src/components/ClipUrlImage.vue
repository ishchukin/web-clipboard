<script setup lang="ts">
import { type ClipUrlImage } from '../model/clip'
defineProps<{
    clip: ClipUrlImage
}>()
</script>

<template>
    <img :src="clip.url"/>
</template>
