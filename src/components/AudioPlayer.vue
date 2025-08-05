
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
