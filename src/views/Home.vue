

// 4. Home.vue
<template>
  <div class="container">
    <h2 class="my-4">Select a Story</h2>
    <div class="d-flex justify-content-end mb-2">
      <select v-model="language" class="form-select w-auto">
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
    <p class="lead">
      Welcome to the Storybook App! / Bienvenue dans l'application Storybook !<br>
      Choose a story to read or listen to, and enjoy learning in both English and French.<br>
      Choisissez une histoire à lire ou à écouter et amusez-vous à apprendre l’anglais et le français.
    </p>
    <div class="row">
      <div
        v-for="story in storyList"
        :key="story.id"
        class="col-12 col-sm-6 col-lg-3 mb-4"
      >
        <div class="card h-100 d-flex flex-column">
          <img :src="story.coverImage" alt="" class="card-img-top img-fluid" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ story.title }}</h5>
            <p class="card-text">{{ story.description }}</p>
            <router-link
              :to="`/story/${story.id}?lang=${language}`"
              class="btn btn-primary mt-auto"
            >
               {{ readStoryLabel }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'

//import stories from '../stories.json'

export default {
  name: 'Home',
  computed: {
      labels() {
        return {
          en: {
            readStory: "Read Story",
          },
          fr: {
            readStory: "Lire l’histoire",
          },
        };
      },
      readStoryLabel() {
        return this.labels[this.language]?.readStory || "Read Story";
      }
    },
  setup() {
    const language = ref('en')
    const storyList = ref([])

    const loadStories = async () => {
      try {
        const langFolder = language.value === 'fr' ? 'fr' : 'en'
        console.log(langFolder);
        const res = await fetch(`/src/assets/stories/${langFolder}/index.json`)
        storyList.value = await res.json();
        console.log(storyList);
      } catch (err) {
        console.error('Failed to load story list:', err)
      }
    }

    

    onMounted(loadStories)
    watch(language, loadStories)

    return {
      language,
      storyList
    }
  }
}
</script>
