<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <h3>Prompt</h3>
    </div>
    <div
      class="w-1/2 h-64 mx-auto rounded-lg border-solid border-2 border-neutral-800 bg-neutral-700 text-slate-200 p-2"
      contenteditable="true"
      @input="onInput"
    >
      Change me!
    </div>
  </div>
</template>

<script setup>
const onInput = (e) => {
  const editableDiv = e.target;

  // Save the caret position before modification
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const wasCollapsed = range.collapsed;

  // Perform the modification (e.g., replacing patterns with <span> elements)
  const modifiedString = e.target.innerHTML.replace(
    /{{\s*(.*?)\s*}}/g,
    (_, innerString) =>
      innerString
        ? `<span class="bg-purple-700 text-white rounded-xl p-2">${innerString}</span`
        : _,
  );
  // Set the modified content back to the editable div
  editableDiv.innerHTML = modifiedString;

  // Restore the caret position after modification
  if (wasCollapsed) {
    const lastChild = editableDiv.lastChild;
    const newRange = new Range();
    newRange.setStart(lastChild, lastChild.textContent.length);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};
</script>
