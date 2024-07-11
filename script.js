let enteredCode = "";

function inputFocus(index) {
   const input = document.querySelector(`[data-index='${index}']`);
   input && input.focus();
}

function handleSubmitEvent(auth_code) {
   document.querySelectorAll(`[data-index]`).forEach(input => {
      input.value = "";
      input.parentNode.classList.remove("active");
      inputFocus(0);
   });
}

function handleInputEvent(event, element) {
   enteredCode = "";
   let index = element.dataset.index;

   if (element.value.length >= 1) {
      element.parentNode.classList.add("active");
      element.value = element.value[0];

      inputFocus(++index);
   } else if (element.value.length < 0 || event.inputType === "deleteContentBackward") {
      element.parentNode.classList.remove("active");

      inputFocus(--index);
   }

   document.querySelectorAll(`[data-index]`).forEach(input => enteredCode += input.value);
   enteredCode.length === 6 && handleSubmitEvent(enteredCode);
}

window.onload = () => inputFocus(0);
