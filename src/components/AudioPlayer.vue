
// 7. AudioPlayer.vue
<template>
  <div class="d-flex justify-content-center gap-3 mt-3">
    <button class="btn btn-primary" @click="speakAll">🔊 {{ hearStoryText }}</button>
    <button class="btn btn-outline-secondary" @click="speakWord('Luna')">👂 {{ hearWordText }}</button>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'AudioPlayer',
  props: ['lines'],
  data() {
    return {
      voices: [],
    }
  },
  mounted() {
    // Load voices (may take a moment)
    this.loadVoices()
    window.speechSynthesis.onvoiceschanged = this.loadVoices
  },
  computed: {
    lang() {
      return this.$route.query.lang === 'fr' ? 'fr' : 'en'
    },
    hearStoryText() {
      return this.lang === 'fr' ? 'Écouter l’histoire' : 'Hear Story'
    },
    hearWordText() {
      return this.lang === 'fr' ? 'Écouter "Luna"' : 'Hear "Luna"'
    }
  },
  methods: {

    loadVoices() {
      this.voices = speechSynthesis.getVoices()
    },
    getLang() {
      return this.$route.query.lang === 'fr' ? 'fr-CA' : 'en-US'
    },
    getVoiceForLang(langCode) {
      console.log( this.voices.find(v => v.lang === langCode))
      return this.voices.find(v => v.lang === langCode) || null
    },
    speakAll() {
      const lang = this.getLang()
      const voice = this.getVoiceForLang(lang)
      const utterance = new SpeechSynthesisUtterance(this.lines.join(' '))
      utterance.lang = lang
      if (voice) utterance.voice = voice
      speechSynthesis.speak(utterance)
    },
    speakWord(word) {
      const lang = this.getLang()
      const voice = this.getVoiceForLang(lang)
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = lang
      if (voice) utterance.voice = voice
      speechSynthesis.speak(utterance)
    }
  

  }
}
</script>
