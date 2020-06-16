import CustomBlock from "./vue-categories-item.vue";
import Vue from "vue";

const CustomBlockCtor = Vue.extend(CustomBlock);

const ICON =
  '<svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z" class=""></path></svg>';

const getInitialData = () => ({
  title: "",
  description: "",
  categories: [],
  minItems: 1
});

/**
 * Annotation content type "categories"
 */
class CategoriesItem {
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
      title: "Kennzeichen"
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   * @param {ChecklistData} data - previously saved data
   * @param {object} config - user config for Tool
   * @param {object} api - Editor.js API
   */
  constructor({ data, api, config }) {
    this.data = { ...getInitialData(), ...data };
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

CategoriesItem.prototype.validate = validate;

export default CategoriesItem;

export function validate(value) {
  if (!(typeof value.title === "string" && value.title.length > 0)) {
    return false;
  }

  // optional
  if ("description" in value && typeof value.description !== "string") {
    return false;
  }

  if (
    !(
      value.categories &&
      Array.isArray(value.categories) &&
      value.categories.length > 0
    )
  ) {
    return false;
  }

  if (typeof value.minItems !== "number" || value.minItems < 0) {
    return false;
  }

  return true;
}
