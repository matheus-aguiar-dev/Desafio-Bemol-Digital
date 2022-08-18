const form = document.getElementById("formulario");
const cepEl = document.getElementById("cep");
const ruaEl = document.getElementById("rua");
const bairroEl = document.getElementById("bairro");

const senha1El = document.getElementById("senha1");
const senha2El = document.getElementById("senha2");

const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let isCepValid = false;
let passwordsMatch = false;

function validateForm() {
  // Use HTML constraint API to check form validity
  isValid = form.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    // Style main message for an error
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  // Check to see if both password fields match
  if (senha1El.value === senha2El.value) {
    // If they match, set value to true and borders to green
    passwordsMatch = true;
    senha1El.style.borderColor = "green";
    senha2El.style.borderColor = "green";
  } else {
    // If they don't match, border color of input to red, change message
    passwordsMatch = false;
    message.textContent = "As senhas são diferentes.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    senha1El.style.borderColor = "red";
    senha2El.style.borderColor = "red";
    return;
  }
  if (isCepValid === false) {
    message.textContent = "Por favor insira um CEP válido.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    cepEl.style.borderColor = "red";
    return;
  } else {
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
  // If form is valid and passwords match
  if (isValid && passwordsMatch) {
    // Style main message for success
    message.textContent = "Registrado com Sucesso!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function fetchData(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function (response) {
      response.json().then(function (data) {
        if (data) {
          ruaEl.value = data.logradouro;
          bairroEl.value = data.bairro;
          isCepValid = true;
        }
      });
    })
    .catch(function () {
      isCepValid = false;
      ruaEl.value = null;
      bairroEl.value = null;
    });
}
cepEl.addEventListener("input", () => {
  if (cepEl.value.length == 8) {
    fetchData(cepEl.value);
  }
});

form.addEventListener("submit", processFormData);

function processFormData(e) {
  e.preventDefault();
  validateForm();
}
