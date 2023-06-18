<script setup lang="ts">
import { type ClipUrlImage } from '../model/clip'
const props = defineProps<{
    clip: ClipUrlImage
}>()
</script>

<template>
    <img :src="props.clip.url"/>
</template>
