// Validación del código de invitación
let invitationData = null;

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("c0d3");

    if (!inviteCode && !InvitationApi.useTemporaryResponse) {
        console.error("Sin código de invitación.");
        window.location.href = "callback.html";
        return;
    }

    try {
        invitationData = await InvitationApi.validateCode(inviteCode);
        if (!invitationData) {
            window.location.href = "callback.html";
            return;
        }
    } catch (error) {
        console.error("Error al validar el código:", error);
        window.location.href = "callback.html";
    }
});

const commentForm = document.getElementById("guest-comment-form");
const formStatus = document.getElementById("form-status");
const submitButton = commentForm.querySelector('[type="submit"]');

commentForm.addEventListener("submit", async event => {
    event.preventDefault();
    formStatus.textContent = "";
    formStatus.removeAttribute("data-state");

    if (!invitationData) {
        formStatus.dataset.state = "error";
        formStatus.textContent = "No se pudo validar tu invitación. Vuelve a abrir el enlace e inténtalo de nuevo.";
        return;
    }

    const formData = new FormData(commentForm);
    const name = String(formData.get("name") ?? "").trim();
    const comment = String(formData.get("comment") ?? "").trim();
    const payload = new URLSearchParams({
        code: invitationData.code,
        row: String(invitationData.row),
        comment: `Nombre: ${name}\nComentario: ${comment}`
    });

    submitButton.disabled = true;
    try {
        const response = await fetch("https://hook.us2.make.com/bauh3ixu02mj9locvgzfz1ruauosdp7o", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`Error HTTP al enviar el comentario: ${response.status}`);
        }

        formStatus.textContent = "¡Gracias! Tu comentario fue enviado correctamente.";
        commentForm.reset();
    } catch (error) {
        console.error("No se pudo enviar el comentario:", error);
        formStatus.dataset.state = "error";
        formStatus.textContent = "No se pudo enviar tu comentario. Inténtalo de nuevo más tarde.";
    } finally {
        submitButton.disabled = false;
    }
});
