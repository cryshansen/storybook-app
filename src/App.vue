
<template>
  <header class="fluid-container back-header">
    <div class="row">
      <div class="col-12 mx-5 p-2">
        <h2>
          <router-link to="/" class="text-decoration-none text-dark">
            📚 Storybook App
          </router-link>
        </h2>
      </div>
    </div>
  </header>
  <div class="container py-3">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>