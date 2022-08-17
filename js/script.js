const form = document.getElementById("formulario");
const cepEl = document.getElementById("cep");
const ruaEl = document.getElementById("rua");
const bairroEl = document.getElementById("bairro");

const senha1El = document.getElementById("senha1");
const senha2El = document.getElementById("senha2");

const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

function processFormData(e) {
  e.preventDefault();
  console.log(e);
}
function fetchData(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function (response) {
      response.json().then(function (data) {
        if (data) {
          ruaEl.value = data.logradouro;
          bairroEl.value = data.bairro;
        }
      });
    })
    .catch(function () {});
}
form.addEventListener("submit", processFormData);
cepEl.addEventListener("input", () => {
  if (cepEl.value.length == 8) {
    fetchData(cepEl.value);
  }
});
