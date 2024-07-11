let enteredCode = "";

async function apiRequest(url) {
   try {
      const { data } = await axios.get(url, {
         headers: { 'Content-Type': 'application/json' }
      });

      if (data.success) {
         console.log(data.access_token)
         alert(`Hello, ${data.name}`)
      } else {
         alert("Invalid Code")
      }
   } catch (error) {
      console.log(`Houve um erro: `, error)
   }
}

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

   apiRequest(`/api/verify/?email=${"by_thiagobxk@gmail.com"}&auth_code=${auth_code}`);
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