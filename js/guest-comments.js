const commentForm = document.getElementById("guest-comment-form");
const formStatus = document.getElementById("form-status");

/**
 * Punto de integración para enviar comentarios al backend.
 * No realiza llamadas de red hasta que se implemente la integración.
 */
async function sendCommentToApi(payload) {
  // Configura aquí la URL del API, por ejemplo: const apiUrl = "https://...";
  // Agrega aquí los headers requeridos, incluido "Content-Type: application/json".
  // Si el API requiere autenticación, agrega el token en el header Authorization.
  // Implementa aquí fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(payload) }).
  // Maneja aquí la respuesta: comprueba response.ok y procesa response.json().
  // Maneja aquí los errores de red/API y comunícalos a la interfaz.
}

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(commentForm);
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    comment: String(formData.get("comment") ?? "").trim()
  };

  formStatus.textContent = "";
  formStatus.removeAttribute("data-state");

  try {
    await sendCommentToApi(payload);
    formStatus.textContent = "Tu comentario está listo. El envío en línea todavía no está habilitado.";
  } catch (error) {
    console.error("No se pudo procesar el comentario:", error);
    formStatus.dataset.state = "error";
    formStatus.textContent = "No se pudo procesar tu comentario. Inténtalo de nuevo más tarde.";
  }
});
