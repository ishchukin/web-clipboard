<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { type ClipView } from '../model/clip'

const props = defineProps<{
  view: ClipView
}>()

const text = ref('loading')

onBeforeMount(async () => {
  text.value = await props.view.blob.text()
})
</script>

<template>
  <pre class="wrapped-pre">{{ text }}</pre>
</template>

<style lang="scss" scoped>
.wrapped-pre {
  white-space: pre-wrap;
}
</style>
