<template>
  <div class="max-w-lg min-h-[500px] w-full m-auto bg-gray-300 rounded-lg p-2">
    <h1 class="text-center">Preview Dashboard</h1>
    <div>
      <div>inputs:</div>
      <div v-for="(input, index) in inputs" :key="index">
        <h1 class="bg-purple-700 text-white rounded-xl p-2 inline-flex my-2">
          {{ input }}
        </h1>
        <div>
          <input v-model="inputValue" type="text" />
        </div>
      </div>
    </div>
    <div class="preview-container" v-html="parsedText"></div>
    <button class="bg-sky-500 p-3 rounded" @click="askQuestion">Run</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAnswer } from "~/utils/chat";
import usePrompt from "~/composables/usePrompt";
import { useChatStream } from "~/composables/chat-stream";
const { text, inputs, updateInputs } = usePrompt();
const inputValue = ref("Banana");

const parsedText = computed(() => {
  const regex = /<h1\b[^>]*>(.*?)<\/h1>/g;
  let rawInput = "";

  const modifiedContent = text.value.replace(regex, (_, h1Content) => {
    rawInput = h1Content;
    return `<h1 class="text-purple-700">${inputValue.value}</h1>`;
  });
  updateInputs(rawInput);
  return modifiedContent;
});

const messages = ref([]);
const answer = ref(null);

const question = ref("how is the weather");

const askQuestion = async () => {
  messages.value.push({
    role: "user",
    content: question.value,
  });
  question.value = "";
  const stream = await getAnswer({ messages: messages.value });
  answer.value = {
    role: "assistant",
    content: "",
  };

  // @TODO if we opt in for direct prompt we won't need to parse streaming chunks

  useChatStream({
    stream,
    onChunk: ({ data }) => {
      answer.value.content += data;
    },
    onReady: () => {
      messages.value.push(answer.value);
      answer.value = null;
    },
  });
};
</script>
