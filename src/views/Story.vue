

// 5. Story.vue
<template>
  <StoryPage
    :image="'https://via.placeholder.com/400x300?text=Luna+Wakes+Up'"
    :text="[ 'Luna wakes up.', 'She stretches.', 'She hugs Milo.', 'Good morning, Milo!' ]"
  />
</template>

<script>

import StoryPage from '../components/StoryPage.vue'

export default {
  name: 'Story',
  components: { StoryPage },
}
</script>
