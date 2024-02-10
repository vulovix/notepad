const defaultValue = `- made with xOS Notepad
 
`;
window.addEventListener("load", () => {
  const editor = document.querySelector("#editor");
  const storage = localStorage.getItem("xOS_Notepad");
  if (storage) {
    editor.value = storage;
  } else if (storage === null) {
    editor.value = defaultValue;
  }
  editor.focus();
});
window.addEventListener("beforeunload", () => {
  const currentText = getTextToCopy();
  saveToStorage(currentText);
});
function copyToClipboard(text) {
  window.navigator.clipboard
    .writeText(text)
    .then(() => console.log("Copied to clipboard!"))
    .catch(() => null);
}
function saveToStorage(text) {
  localStorage.setItem("xOS_Notepad", text);
}
function getTextToCopy() {
  const textToCopy = document.querySelector("#editor");
  return textToCopy.value;
}

document.addEventListener(
  "keydown",
  function (e) {
    if (
      e.key === "s" &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      const currentText = getTextToCopy();
      saveToStorage(currentText);
      copyToClipboard(currentText);
    }
  },
  false
);
