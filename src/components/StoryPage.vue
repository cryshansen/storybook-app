
// 6. StoryPage.vue
<template>
  <div class="d-flex justify-content-end mb-2">
    <select v-model="language" class="form-select w-auto">
      <option value="en-US">English</option>
      <option value="fr-FR">Français</option>
    </select>
  </div>

  <div class="bg-white p-4 rounded shadow">
    <div class="text-center mb-4">
      <img :src="image" class="img-fluid rounded story-image" alt="Story scene" />
    </div>
    <p v-for="(line, index) in text" :key="index">
      <span v-for="(word, i) in line.split(' ')" :key="i">
        <span class="word-highlight" @click="speakWord(word)">
          {{ word }}
        </span>
        <span> </span>
      </span>
    </p>

    <AudioPlayer :lines="text" />
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer.vue'
import { ref } from 'vue'

export default {
  name: 'StoryPage',
  props: {
    image: String,
    text: Array
  },
  components: { AudioPlayer },
  setup() {
    const language = ref('en-US')

    function speakWord(word) {
      const msg = new SpeechSynthesisUtterance(word)
      msg.lang = language.value
      speechSynthesis.speak(msg)
    }

    return { speakWord, language }
  }
}
</script>

<style>
.story-image {
  max-height: 300px;
  object-fit: contain;
}

.word-highlight {
  text-decoration: none;
  transition: all 0.2s ease;
}

.word-highlight:hover {
  text-decoration: underline;
  cursor: pointer;
}


</style>
