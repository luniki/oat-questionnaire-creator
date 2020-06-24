<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            3. Fragebogen erstellen
          </h1>
        </div>
      </div>
    </section>
    <block-editor
      v-if="definitions.categories.length"
      class="editor content"
      :data="data"
      :definitions="definitions"
      :prompt="prompt"
    ></block-editor>
  </div>
</template>

<script>
import BlockEditor from "./BlockEditor.vue";

export default {
  props: ["data", "definitions", "prompt"],
  components: {
    "block-editor": BlockEditor
  }
};
</script>
