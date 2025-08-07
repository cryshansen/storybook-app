//storypage.vue
<template>
  <div v-if="page" class="d-flex justify-content-end mb-2">
    <select v-model="language" class="form-select w-auto">
      <option value="en-US">English</option>
      <option value="fr-FR">Français</option>
    </select>
  </div>

  <div v-if="page" class="bg-white p-4 rounded shadow">
    <div class="text-center mb-4">
      <img :src="page.image" class="img-fluid rounded story-image" alt="Story scene" />
    </div>
    <div>
    <div v-for="(interaction, index) in page.interactions" :key="index">
      <img
        v-if="interaction.target && interaction.target !== 'Word'"
        :src="getImageForTarget(interaction.target)"
        class="clickable-image"
        @click="handleInteraction(interaction.target)"
      />
      <button
        v-if="interaction.name === 'read'"
        class="btn btn-primary mt-3"
        @click="handleInteraction('read')"
      >
        📖 {{ hearWordText }}
      </button>
    </div>

  </div>
    <p v-for="(line, index) in page.text.split('\n')" :key="index">
      <span v-for="(word, i) in line.split(' ')" :key="i">
        <span class="word-highlight" @click="speakWord(word)">
          {{ word }}
        </span>
        <span>&nbsp; </span>
      </span>
    </p>

    <AudioPlayer :lines="[page.text]" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AudioPlayer from './AudioPlayer.vue'

export default {
  name: 'StoryPage',
  props: {
    page: Object
  },
  components: { AudioPlayer },
  computed: {
    lang() {
      return this.$route.query.lang === 'fr' ? 'fr' : 'en'
    },
    hearStoryText() {
      return this.lang === 'fr' ? 'lire à haute voix' : 'Read Aloud'
    },
    hearWordText() {
      return this.lang === 'fr' ? 'lire à haute voix' : 'Read Aloud'
    }
  },
  setup(props) {

    // Normalize the language input
    const langMap = {
      en: 'en-US',
      fr: 'fr-CA', // or 'fr-FR' if you prefer
    };

    const route = useRoute()
    const language = langMap[route.query.lang] || 'en-US' 
    //const language = route.query.lang ==='fr' ? 'fr-FR': 'en-US' 
    console.log(language)
    //const language = ref('fr-CA') 

    function speakWord(word) {
      console.log( speechSynthesis.getVoices().find(v => v.lang === language))
      const msg = new SpeechSynthesisUtterance(word)
      msg.lang = language 
      speechSynthesis.speak(msg)
    }

    // 🔍 Check if a target has an interaction
    function hasInteraction(target) {
      return props.page.interactions?.some(
        (interaction) => interaction.target === target || interaction.name === target
      )
    }
    
    function getImageForTarget(target) {
      // In a real app, map targets to actual assets
      return `https://via.placeholder.com/150?text=${target}`;
    }

    // 🔁 Handle interaction by target or name
    function handleInteraction(target) {
      const interaction = props.page.interactions?.find(
        (i) => i.target === target || i.name === target
      )
      if (!interaction) return

      switch (interaction.action) {
        case 'gigglesAndSqueaks':
          showToast('Milo giggles and squeaks!')
          break
        case 'riseGlow':
          showToast('The sun rises and glows!')
          break
        case 'hearWord':
          speakWord(interaction.context || target)
          break
        case 'readAloud':
          speakWord(props.page.text)
          break
        default:
          alert(interaction.target)
          console.warn('Unknown interaction:', interaction)
      }
    }

    // Simple toast (you can replace this with a proper one)
    function showToast(msg) {
      alert(msg)
    }
    return { language, speakWord, handleInteraction, hasInteraction, getImageForTarget }
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

.pin {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 100, 100, 0.8);
  box-shadow: 0 0 10px 3px rgba(255, 100, 100, 0.7);
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
