<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <customize-prompt v-model="prompt"></customize-prompt>
      <upload-definitions v-model="definitions"></upload-definitions>
      <create-questionnaire
        v-if="definitions.categories.length"
        :data="data"
        :definitions="definitions"
        :prompt="prompt"
      ></create-questionnaire>
    </div>
  </div>
</template>

<script>
import CreateQuestionnaire from "./components/CreateQuestionnaire.vue";
import CustomizePrompt from "./components/CustomizePrompt.vue";
import NavBar from "./components/NavBar.vue";
import UploadDefinitions from "./components/UploadDefinitions.vue";

export default {
  data() {
    return {
      definitions: { categories: [], scales: [] },
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
      },
      prompt: ""
    };
  },
  methods: {},
  components: {
    "create-questionnaire": CreateQuestionnaire,
    "customize-prompt": CustomizePrompt,
    "nav-bar": NavBar,
    "upload-definitions": UploadDefinitions
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
