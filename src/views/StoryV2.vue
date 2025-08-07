

// 5. StoryV2.vue
<template>
  <div v-if="storyData.length">
   <StoryPage :page="currentPage" :language="language" @update:language="onLanguageChange" />

    <div class="mt-3 d-flex justify-content-between">
      <button class="btn btn-secondary" @click="prevPage" :disabled="currentPageIndex === 0">Previous</button>
      <button class="btn btn-primary" @click="nextPage" :disabled="currentPageIndex === storyData.length - 1">Next</button>
    </div>
  </div>
  <div v-else>
    Loading story...
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, userRouter } from 'vue-router'
import StoryPage from '../components/StoryPage.vue'

export default {
  name: 'Story',
  components: { StoryPage },
  setup() {
    const route = useRoute()
    const router = userRouter()
    const storyId = route.params.id
    const lang = ref(route.query.lang || 'en')
    const storyData = ref([]) // full story array
    const currentPageIndex = ref(0) // track which page we are on

    const loadStory(async () => {
      try {
        const langFolder = lang === 'fr' ? 'fr' : 'en'
        const res = await fetch(`/src/assets/stories/${langFolder}/${storyId}.json`)
        storyData.value = await res.json()
      } catch (err) {
        console.error('Failed to load story:', err)
      }
    })

    const onLanguageChange = (newLang) => {
      language.value = newLang
      router.replace({ path: `/story/${storyId}`, query: { lang: newLang } })
    }

    const currentPage = computed(() => storyData.value[currentPageIndex.value])

    function nextPage() {
      if (currentPageIndex.value < storyData.value.length - 1) {
        currentPageIndex.value++
      }
    }

    function prevPage() {
      if (currentPageIndex.value > 0) {
        currentPageIndex.value--
      }
    }

    return {
      storyData,
      currentPage,
      currentPageIndex,
      nextPage,
      prevPage,
      language,
      onLanguageChange
    }
  }
}
</script>

