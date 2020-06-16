<template>
  <div class="cdx-block annotation-content-type-categories">
    <header>
      <h2>Kennzeicheninhalt</h2>
    </header>

    <div class="columns">
      <div class="column">
        <b-field label="Titel *">
          <b-input :value="value.title" @input="changeTitle" required></b-input>
        </b-field>
      </div>
      <div class="column is-two-thirds categories">
        <label class="label">Wählen Sie mindestens eine Kategorie *:</label>
        <div class="field" v-for="category in categories" :key="category.name">
          <b-checkbox :native-value="category.name" v-model="checkedCategories">
            <span
              class="tag"
              :style="{ backgroundColor: category.settings.color }"
            >
              {{ category.name }}
            </span>
          </b-checkbox>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-two-thirds is-offset-one-third">
        <b-field label="Erläuterungen">
          <b-input
            :value="value.description"
            @input="changeDescription"
            placeholder="Lorem ipsum"
          ></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column is-two-thirds is-offset-one-third">
        <b-field label="Mindestanzahl an Kennzeichen">
          <b-numberinput
            :value="value.minItems"
            @input="changeMinItems"
            min="0"
            icon-pack="fas"
            controls-position="compact"
            type="is-dark"
          ></b-numberinput>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from "../oat-export";

export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          title: "",
          description: "",
          categories: [],
          minItems: 1
        };
      }
    }
  },
  data() {
    return {
      categories: categories,
      checkedCategories: []
    };
  },
  methods: {
    changeDescription(description) {
      this.$set(this.value, "description", description);
      this.$emit("input", { ...this.value, description });
    },
    changeMinItems(minItems) {
      this.$set(this.value, "minItems", minItems);
      this.$emit("input", { ...this.value, minItems });
    },
    changeTitle(title) {
      this.$set(this.value, "title", title);
      this.$emit("input", { ...this.value, title });
    }
  },
  watch: {
    checkedCategories(categories) {
      this.$set(this.value, "categories", categories);
      this.$emit("input", { ...this.value, categories });
    }
  }
};
</script>

<style scoped>
.annotation-content-type-categories header h2 {
  color: #bbb;
  font-size: 1rem;
  font-style: italic;
  font-variant-caps: small-caps;
  font-weight: normal;
}
</style>
