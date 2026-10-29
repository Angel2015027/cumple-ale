// DOM References: referencias a los elementos del formulario.
const codeForm = document.getElementById("code-form");
const codeInput = document.getElementById("code-input");
const formView = document.getElementById("form-view");
const notFoundView = document.getElementById("not-found-view");

// API Integration Placeholder: punto de entrada para integrar una API.
function sendCodeToApi(code) {
  // Implementa aquí la llamada HTTP cuando la API esté disponible.
  // Por ejemplo, usa fetch("https://tu-api.com/endpoint", { ... })
  // y envía `code` en el cuerpo de la solicitud.
  // Esta función no realiza ninguna petición por ahora.
  console.log("Código listo para enviar:", code);

  if (code === 'p01') {
    window.location.href = `index.html?c0d3=${code}`;
    return;
  }

  formView.hidden = true;
  notFoundView.hidden = false;
  document.title = "404 - Page Not Found";
}

// Form Submission Logic: captura el código y evita el envío tradicional.
function handleFormSubmission(event) {
  event.preventDefault();

  const code = codeInput.value.trim();
  sendCodeToApi(code);
}

// Event Listeners: escucha el envío tanto del botón como de Enter.
codeForm.addEventListener("submit", handleFormSubmission);
