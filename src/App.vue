<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VAppBarTitle,
  VNavigationDrawer,
  VMain,
  VListItem,
  VDivider
} from 'vuetify/components'
import Routes from './routes'
const drawer = ref<boolean | null>(null)
const route = useRoute()
const currentRouteName = computed(() => route.name)
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ currentRouteName }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list-item link title="Home" :to="Routes.Home" />
      <v-list-item link title="Settings" :to="Routes.Settings" />
      <v-list-item link title="About" :to="Routes.About" />
      <v-divider />
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
