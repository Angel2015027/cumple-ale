// Validación del código de invitación
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Obtener el parámetro 'c0d3' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("c0d3");
    const invitedData = {}

    // 2. Si no hay código en la URL, redirigir a la página callback
    if (!inviteCode) {
        console.error('Sin codigo de invitación')
        window.location.href = "callback.html";
        return;
    }

    // 3. Validar el código con el API externo
    try {
        const response = await fetch(`https://hook.us2.make.com/1bs3fr8ptb8uku2aw6rcdfnrdvudbewe?code=${inviteCode}`, {
            method: "GET", // o POST según tu API
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok || !data.row) {
            // Si el código no es válido, redirigir al callback (o mostrar Not Found)
            window.location.href = "callback.html";
            return;
        }

        Object.assign(invitedData, data)

        // 4. Si es válido, agregamos el nombre del invitado al formulario
        // document.getElementById("nombre-invitado").textContent = data.name;

    } catch (error) {
        console.error("Error al validar el código:", error);
        window.location.href = "callback.html";
    }
});

const commentForm = document.getElementById("guest-comment-form");
const formStatus = document.getElementById("form-status");

/**
 * Punto de integración para enviar comentarios al backend.
 * No realiza llamadas de red hasta que se implemente la integración.
 */
async function sendCommentToApi(payload) {
  // Configura aquí la URL del API, por ejemplo: const apiUrl = "https://...";

  // POST https://hook.us2.make.com/t8wkp22fhvtnwqpiwi4s76gzqdqzc271 form-data or xx-url-form-algo xD con code, row y comment

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
