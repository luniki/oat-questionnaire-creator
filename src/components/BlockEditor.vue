<template>
  <div>
    <editor ref="editor" :config="config" :initialized="onInitialized" />

    <b-button type="is-info" @click="saveButton"
      >Exportiere Fragebogendefinition</b-button
    >

    <section class="section" v-if="blob">
      <a ref="download" download="questionnaire.json" :href="blobURL"
        >Download</a
      >
    </section>

    <pre v-if="output">{{ output }}</pre>
  </div>
</template>

<script>
import Paragraph from "@editorjs/paragraph";
import CategoriesItem from "../blocks/categories-item";
import TextItem from "../blocks/text-item";

const PARAGRAPH = "paragraph";

const ICON =
  '<svg style="margin-top: 8px" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 48v32a16 16 0 0 1-16 16h-48v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V96h-32v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V352h-32a160 160 0 0 1 0-320h240a16 16 0 0 1 16 16z" class=""></path></svg>';

export default {
  props: ["categories", "data"],
  data() {
    return {
      config: {
        tools: {
          [PARAGRAPH]: {
            class: Paragraph,
            inlineToolbar: false,
            toolbox: {
              title: "Erklärung",
              icon: ICON
            }
          },
          "text-item": {
            class: TextItem
          },
          "categories-item": {
            class: CategoriesItem
          }
        },
        data: this.data
      },
      editor: null,
      output: "",
      blob: null
    };
  },
  computed: {
    blobURL() {
      return this.blob && URL.createObjectURL(this.blob);
    }
  },
  methods: {
    onInitialized(editor) {
      this.editor = editor;
    },
    async saveButton() {
      this.output = "";

      const outputData = await this.editor.save();

      const len = this.editor.blocks.getBlocksCount();
      let specialBlocksInEditor = 0;
      for (let index = 0; index < len; index++) {
        const block = this.editor.blocks.getBlockByIndex(index);
        if (block.name !== PARAGRAPH) {
          specialBlocksInEditor++;
        }
      }

      const specialBlocksInOutput = outputData.blocks.reduce(
        (memo, block) => memo + (block.type !== PARAGRAPH ? 1 : 0),
        0
      );

      if (specialBlocksInEditor == specialBlocksInOutput) {
        this.output = createSchemaFrom(outputData);
        this.blob = new Blob([JSON.stringify(this.output)], {
          type: "application/json"
        });
      } else {
        this.$buefy.dialog.alert({
          title: "Fehler",
          message: "Definition des Fragebogens ist nicht vollständig.",
          type: "is-danger",
          hasIcon: true,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true
        });
      }
    }
  }
};

function createSchemaFrom(data) {
  const jsonform = {
    schema: {},
    form: []
  };

  let itemId = 0;
  let schemaId;

  data.blocks.forEach(block => {
    switch (block.type) {
      case PARAGRAPH:
        jsonform.form.push({
          type: "help",
          helpvalue: block.data.text
        });
        break;
      case "categories-item":
        schemaId = `item-${itemId++}`;
        jsonform.schema[schemaId] = {
          type: "categories",
          ...block.data
        };
        jsonform.form.push(schemaId);
    }
  });

  return jsonform;
}
</script>

<style scoped>
.cdx-block {
  margin-bottom: 2rem;
}

pre {
  margin-top: 2rem;
}
</style>
