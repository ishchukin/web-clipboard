<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useClipStore } from '../stores/clips'
import ClipCard from '../components/ClipCard.vue'
import { ClipType } from '../model/clip'
import logo from '@/assets/logo.svg'
const clipStore = useClipStore()
const pushClip = () => {
  if (Math.random() > 0.5) {
    clipStore.clips.push({
      id: crypto.randomUUID(),
      type: ClipType.Text,
      text: 'foo!'
    })
  } else {
    clipStore.clips.push({
      id: crypto.randomUUID(),
      type: ClipType.UrlImage,
      url: logo
    })
  }
}
</script>
<template>
  <h2>Home</h2>
  <main>
    <button @click="pushClip">Push</button>
    <ul>
      <li v-for="clip in clipStore.clips" :key="clip.id">
        <ClipCard :clip="clip" />
      </li>
    </ul>
    <ul></ul>
  </main>
</template>
