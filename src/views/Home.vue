

// 4. Home.vue
<template>
  <div>
    <h1 class="mb-4">📚 Storybook App</h1>
    <div class="list-group">
      <router-link class="list-group-item list-group-item-action" :to="{ name: 'Story', params: { id: 1 } }">
        Luna's Busy Day
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>