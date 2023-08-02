<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <h3>Prompt</h3>
    </div>
    <div class="max-w-lg min-h-[500px] w-full">
      <CommonEditor v-model="content" @update:modelValue="handleUpdateHTML" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import usePrompt from "~/composables/usePrompt";
const { setText, setInputs } = usePrompt();

const content = ref(`
    Given the following fruit, output the closest color hex value that matches the color of that fruit.
    <br>
    <p>Fruit:</p>
    {{ fruit }}
    <br>
    Color hex string:
`);

const handleUpdateHTML = (value) => {
  let savedInnerString = "";

  const replacedHtml = value.replace(/{{\s*(.*?)\s*}}/g, (_, innerString) => {
    if (innerString) {
      savedInnerString = innerString;
      return `<h1>${innerString}</h1><br>`;
    } else {
      return _;
    }
  });
  content.value = replacedHtml;
  setText(replacedHtml);
  if (savedInnerString) setInputs(savedInnerString);
};
</script>
