import CustomBlock from "./vue-text-item.vue";
import Vue from "vue";

const CustomBlockCtor = Vue.extend(CustomBlock);

const ICON = '<svg width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" class=""></path></svg>'

/**
 * Annotation content type "free text"
 */
class TextItem {
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: ICON,
      title: "Freitext"
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   * @param {ChecklistData} data - previously saved data
   * @param {object} config - user config for Tool
   * @param {object} api - Editor.js API
   */
  constructor({ data, api, config }) {
    this.data = data;
    this.api = api;
    this.config = config;
    this.wrapper = undefined;
    this.component = undefined;
  }

  /**
   * @return {Element}
   * @public
   */
  render() {
    this.wrapper = document.createElement("div");
    this.component = new CustomBlockCtor({
      propsData: {
        value: this.data
      }
    });
    this.component.$mount();
    this.component.$on("input", data => {
      this.data = data;
      console.log("on input", data);
    });

    return this.wrapper.appendChild(this.component.$el);
  }

  save() {
    return { ...this.data };
  }
}

TextItem.prototype.validate = validate;

export default TextItem;

export function validate(value) {
  if (!(typeof value.title === "string" && value.title.length > 0)) {
    return false;
  }

  if ("description" in value && typeof value.description !== "string") {
    return false;
  }
  if ("required" in value && typeof value.required !== "boolean") {
    return false;
  }

  return true;
}
