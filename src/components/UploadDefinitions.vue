<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            1. Definitionen hochladen
          </h1>
          <h2 class="subtitle">
            Laden Sie bitte den Export der von Ihnen gewünschten Kategorien und
            Skalen hoch.
          </h2>
        </div>
      </div>
    </section>
    <section class="section" v-if="!hasDefinitions()">
      <b-field>
        <b-upload v-model="file" @input="handleUpload" drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"> </b-icon>
              </p>
              <p>Dateien hierhin ziehen oder klicken zum Hochladen</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </section>

    <a name="categories-list" ref="categoriesList"></a>

    <section
      class="section content categories"
      v-if="definitions.categories && definitions.categories.length"
    >
      <h4>Enthaltene Kategorien:</h4>
      <b-tag
        v-for="category in definitions.categories"
        :key="category.name"
        :style="{ backgroundColor: category.settings.color }"
        >{{ category.name }}</b-tag
      >
    </section>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      file: null,
      definitions: this.value
    };
  },
  methods: {
    hasDefinitions() {
      return (
        Array.isArray(this.definitions.categories) &&
        this.definitions.categories.length &&
        Array.isArray(this.definitions.scales)
      );
    },
    handleUpload() {
      const reader = new FileReader();

      reader.onload = e => {
        this.$set(this.definitions, "categories", []);
        this.$set(this.definitions, "scales", []);
        const importAsString = e.target.result;

        try {
          const json = JSON.parse(importAsString);
          this.$set(this.definitions, "categories", importCategories(json));
          this.$set(this.definitions, "scales", importScales(json));
          this.$emit("input", this.definitions);
          this.$nextTick(() => this.$refs.categoriesList.scrollIntoView());
        } catch (error) {
          console.log(error);
          this.$buefy.dialog.alert({
            title: "Fehler",
            message:
              "Die hochgeladene Datei enthält keine gültigen Kategoriendefinitionen.",
            type: "is-danger",
            hasIcon: true,
            icon: "times-circle",
            iconPack: "fa",
            ariaRole: "alertdialog",
            ariaModal: true
          });
        }
      };

      reader.readAsText(this.file);
    }
  }
};

function importCategories(json) {
  if ("categories" in json && json.categories.length) {
    return json.categories;
  }

  throw new Error("Die Datei hat ein falsches Format.");
}
function importScales(json) {
  if ("scales" in json && Array.isArray(json.scales)) {
    return json.scales;
  }

  throw new Error("Die Datei hat ein falsches Format.");
}
</script>

<style scoped>
span.tag {
  margin-right: 1em;
}
</style>
