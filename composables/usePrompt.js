import { reactive, toRefs } from "vue";

const state = reactive({
  text: "",
  inputs: {},
});

export default function usePrompt() {
  const actions = {
    setText: (text) => {
      state.text = text;
    },
    setInputs: (input) => {
      state.inputs[input] = input;
    },
    updateInputs: (data) => {
      console.log(data);
      console.log(state.inputs);
    },
  };

  return { ...toRefs(state), ...actions };
}
