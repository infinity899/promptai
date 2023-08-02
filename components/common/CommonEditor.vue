<template>
  <div class="editor-content-container">
    <editor-content :editor="editor" />
  </div>
</template>

<script>
// @TODO refactor this to script of type setup
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "update:modelText"],

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Heading.configure({
          HTMLAttributes: {
            class: "bg-purple-700 text-white rounded-xl p-2 inline-flex",
          },
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());
        this.$emit("update:modelText", this.editor.getText());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
    this.$emit("update:modelValue", this.editor.getHTML());
    this.$emit("update:modelText", this.editor.getText());
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.ProseMirror {
  width: 100%;
  border: 1px solid #303030;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  color: white;
  background-color: #303030;
}
.editor-content-container div,
.editor-content-container {
  width: 100%;
  height: 100%;
}
</style>
