<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Routes } from './routes';
</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="64" height="64" />
      <nav>
        <RouterLink :to="Routes.Home">Home</RouterLink>
        <RouterLink :to="Routes.Settings">Settings</RouterLink>
        <RouterLink :to="Routes.About">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped lang="scss">
header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  line-height: 1.5;
  max-height: 100vh;

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }
}

.logo {
  margin: 0 2rem 0 0;
}

nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 1rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);

    &.router-link-exact-active:hover {
      background-color: transparent;
    }

    &.router-link-exact-active {
      color: var(--color-text);
    }

    &:first-of-type {
      border: 0;
    }

  }
}</style>
