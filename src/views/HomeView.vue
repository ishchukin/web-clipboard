<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useClipStore } from '../stores/clips';
import ClipCard from '../components/ClipCard.vue'
import { ClipType } from '../model/clip'
const clipStore = useClipStore();
const pushClip = () => {
  clipStore.clips.push({
    id: crypto.randomUUID(),
    type: ClipType.Text,
    text: 'foo!'
  })
}
</script>
<template>
  <h2>Home</h2>
  <main>
    <button @click="pushClip">Push</button>
    <ul>
      <li v-for="clip in clipStore.clips" :key="clip.id">
        <ClipCard :clip="clip"/>
      </li>
    </ul>
    <ul>
    </ul>
  </main>
</template>
