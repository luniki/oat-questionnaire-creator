<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <upload-categories v-model="categories"></upload-categories>
      <create-questionnaire
        v-if="categories && categories.length"
        :categories="categories"
        :data="data"
      ></create-questionnaire>
    </div>
  </div>
</template>

<script>
import CreateQuestionnaire from "./components/CreateQuestionnaire.vue";
import NavBar from "./components/NavBar.vue";
import UploadCategories from "./components/UploadCategories.vue";

export default {
  data() {
    return {
      categories: [],
      data: {
        time: 1591362820044,
        blocks: [
          {
            type: "paragraph",
            data: {
              text: `Etwas einleitender Text: Editier mich! Lorem
  ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. `
            }
          }
        ],
        version: "2.18.0"
      }
    };
  },
  methods: {},
  components: {
    "create-questionnaire": CreateQuestionnaire,
    "nav-bar": NavBar,
    "upload-categories": UploadCategories
  }
};
</script>

<style scoped>
.container > h1 {
  margin-bottom: 2rem;
}

.editor {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}
</style>

<style>
span.icon i {
  font-style: normal;
}
</style>
