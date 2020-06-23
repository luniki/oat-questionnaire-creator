<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            2. Fragebogen erstellen
          </h1>
        </div>
      </div>
    </section>
    <block-editor
      v-if="definitions.categories.length"
      class="editor content"
      :definitions="definitions"
      :data="data"
    ></block-editor>
  </div>
</template>

<script>
import BlockEditor from "./BlockEditor.vue";

export default {
  props: ["definitions", "data"],
  components: {
    "block-editor": BlockEditor
  }
};
</script>
