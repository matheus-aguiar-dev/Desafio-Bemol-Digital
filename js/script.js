// SELETORES
const form = document.getElementById("formulario");
const cepEl = document.getElementById("cep");
const ruaEl = document.getElementById("rua");
const bairroEl = document.getElementById("bairro");

const senha1El = document.getElementById("senha1");
const senha2El = document.getElementById("senha2");

const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

cepEl.value = "";
bairroEl.value = "";
ruaEl.value = "";

//FLAGS DE VALIDAÇÃO
let isValid = false;
let isCepValid = false;
let passwordsMatch = false;

// FUNÇÃO RESPONSAVEL PELA VALIDAÇÃO
function validateForm() {
  // CheckValidity é responsável em checar se todos os campos estão devidamente preenchidos
  isValid = form.checkValidity();
  if (!isValid) {
    // Aqui é responsável em dar um feedback no que ocorreu de errado
    message.textContent = "Preencha os campos em vermelho.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  // checar se ambas as senhas são iguais
  if (senha1El.value === senha2El.value) {
    // se são iguais, a cor ira ficar verde
    passwordsMatch = true;
    senha1El.style.borderColor = "green";
    senha2El.style.borderColor = "green";
  } else {
    // caso não forem, ficara vermelha
    passwordsMatch = false;
    message.textContent = "As senhas são diferentes.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    senha1El.style.borderColor = "red";
    senha2El.style.borderColor = "red";
    return;
  }

  //função responsável em checar se o campo de Cep está válido
  if (isCepValid === false) {
    //caso encontrar algum problema, será indicado com a cor vermelha
    message.textContent = "Por favor insira um CEP válido.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    cepEl.style.borderColor = "red";
    ruaEl.style.borderColor = "red";
    bairroEl.style.borderColor = "red";
    return;
  }
  // se estiver correto com a cor verde
  else {
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }

  if (isValid && passwordsMatch) {
    message.textContent = "Registrado com Sucesso!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

// Função responsável em consumir a API de validação de CEP
function fetchData(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        if (data) {
          ruaEl.value = data.logradouro;
          bairroEl.value = data.bairro;
          isCepValid = true;
          cepEl.style.borderColor = "green";
          ruaEl.style.borderColor = "green";
          bairroEl.style.borderColor = "green";
        }
        if (data.erro) {
          isCepValid = false;
          ruaEl.value = "não encontrado";
          bairroEl.value = "não encontrado";
          cepEl.style.borderColor = "red";
          ruaEl.style.borderColor = "red";
          bairroEl.style.borderColor = "red";
        }
      });
    })
    .catch(function () {
      isCepValid = false;
      ruaEl.value = "não encontrado";
      bairroEl.value = "não encontrado";
    });
}

// Se o valor do elemento do CEP digitado for igual a 8, ira chamar essa função
cepEl.addEventListener("input", () => {
  if (cepEl.value.length == 8) {
    fetchData(cepEl.value);
  }
});

// Esse evento e função será ativado quando o botão de submit for pressionado
form.addEventListener("submit", processFormData);

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid && passwordsMatch) {
    alert("Parabéns, você se cadastrou com sucesso!");
  }
}
