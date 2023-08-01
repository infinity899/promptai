<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <h3>Prompt</h3>
    </div>
    <div class="max-w-lg min-h-[500px] w-full">
      <CommonEditor v-model="content" />
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
const content = ref(`
Given the following fruit, output the closest color hex value that matches the color of that fruit.
<br>
<p>Fruit:</p>
<h1>fruit </h1>
<br>
Color hex string:
`);

watch(content, (newVal) => {
  content.value = newVal.replace(/{{\s*(.*?)\s*}}/g, (_, innerString) =>
    innerString
      ? `<h1 >${innerString}</h1
         <br>`
      : _,
  );
});
</script>
