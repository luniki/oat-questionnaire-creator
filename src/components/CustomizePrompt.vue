<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            1. Annotationsaufforderung anpassen
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <b-field label="Aufforderung">
        <b-input
          maxlength="300"
          type="textarea"
          :value="value"
          @input="$emit('input', $event)"
        ></b-input>
      </b-field>
    </section>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>
