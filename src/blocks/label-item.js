import CustomBlock from "./vue-label-item.vue";
import Vue from "vue";

const CustomBlockCtor = Vue.extend(CustomBlock);

const ICON =
      '<svg width="17" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" class=""></path></svg>'

/**
 * Annotation content type "label"
 */
class LabelItem {
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
      title: "Label Item"
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

LabelItem.prototype.validate = validate;

export default LabelItem;

export function validate(value) {
    value;
  return true;
}
