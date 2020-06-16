<template>
  <div class="cdx-block annotation-content-type-text">
    <header>
      <h2>Freitextinhalt</h2>
    </header>

    <div class="columns">
      <div class="column">
        <b-field label="Titel *">
          <b-input :value="value.title" @input="changeTitle" required></b-input>
        </b-field>
      </div>
      <div class="column is-two-thirds">
        <b-field label="<Inhalt>">
          <b-input type="textarea" disabled></b-input>
        </b-field>
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
        <div class="field">
          <b-checkbox :value="value.required" @input="changeRequired"
            >required</b-checkbox
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from "./text-item.js";

export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          title: "",
          description: "",
          required: false
        };
      },
      validator: validate
    }
  },
  data() {
    return {};
  },
  methods: {
    changeDescription(description) {
      this.$set(this.value, "description", description);
      this.$emit("input", { ...this.value, description });
    },
    changeRequired(required) {
      this.$set(this.value, "required", required);
      this.$emit("input", { ...this.value, required });
    },
    changeTitle(title) {
      this.$set(this.value, "title", title);
      this.$emit("input", { ...this.value, title });
    }
  }
};
</script>

<style scoped>
.annotation-content-type-text header h2 {
  color: #bbb;
  font-size: 1rem;
  font-style: italic;
  font-variant-caps: small-caps;
  font-weight: normal;
}

.field.demo label {
  opacity: 0.2;
}
</style>
