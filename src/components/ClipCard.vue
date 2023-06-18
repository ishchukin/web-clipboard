<script setup lang="ts">
import { ClipType, type Clip } from '../model/clip'
import ClipUrlImage from './ClipUrlImage.vue'
import ClipText from './ClipText.vue'


const props = defineProps<{
    clip: Clip
}>();

const components = {
    [ClipType.Text]: ClipText,
    [ClipType.UrlImage]: ClipUrlImage
}

</script>

<template>
    <article>
        <component
            :is="components[props.clip.type]"
            :clip="props.clip"/>
    </article>
</template>