
/*
Vue 3 + Bootstrap 5 Storybook App + PWA Support
*/

// Directory Structure
// storybook-app/
// ├── public/
// │   └── manifest.json
// ├── src/
// │   ├── assets/
// │   ├── components/
// │   │   ├── StoryPage.vue
// │   │   └── AudioPlayer.vue
// │   ├── views/
// │   │   ├── Home.vue
// │   │   └── Story.vue
// │   ├── App.vue
// │   ├── main.js
// │   └── router.js
// ├── index.html
// ├── vite.config.js
// └── package.json


/

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

// 6. StoryPage.vue
<template>
  <div class="bg-white p-4 rounded shadow">
    <div class="text-center mb-4">
      <img :src="image" class="img-fluid rounded story-image" alt="Story scene" />
    </div>
    <div class="fs-5 text-center">
      <p v-for="(line, index) in text" :key="index">{{ line }}</p>
    </div>
    <AudioPlayer :lines="text" />
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer.vue'

export default {
  name: 'StoryPage',
  props: {
    image: String,
    text: Array
  },
  components: { AudioPlayer }
}
</script>

<style>
.story-image {
  max-height: 300px;
  object-fit: contain;
}
</style>

// 7. AudioPlayer.vue
<template>
  <div class="d-flex justify-content-center gap-3 mt-3">
    <button class="btn btn-primary" @click="speakAll">🔊 Hear Story</button>
    <button class="btn btn-outline-secondary" @click="speakWord('Luna')">👂 Hear "Luna"</button>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: ['lines'],
  methods: {
    speakAll() {
      const utterance = new SpeechSynthesisUtterance(this.lines.join(' '))
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    },
    speakWord(word) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }
}
</script>

// 8. vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Storybook App',
        short_name: 'Storybook',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})

// 9. public/manifest.json (redundant with VitePWA plugin but shown here for clarity)
{
  "name": "Storybook App",
  "short_name": "Storybook",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d6efd",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
