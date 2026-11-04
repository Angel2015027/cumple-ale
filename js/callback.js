// DOM References: referencias a los elementos del formulario.
const codeForm = document.getElementById("code-form");
const codeInput = document.getElementById("code-input");
const formView = document.getElementById("form-view");
const notFoundView = document.getElementById("not-found-view");
const submitButton = codeForm.querySelector('[type="submit"]');

async function validateAndOpenInvitation(code) {
  try {
    const invitation = await InvitationApi.validateCode(code);
    if (!invitation) {
      formView.hidden = true;
      notFoundView.hidden = false;
      document.title = "404 - Page Not Found";
      return;
    }

    const invitationUrl = new URL("index.html", window.location.href);
    invitationUrl.searchParams.set("c0d3", invitation.code);
    window.location.href = invitationUrl.toString();
  } catch (error) {
    console.error("Error al validar el código:", error);
    formView.hidden = true;
    notFoundView.hidden = false;
    document.title = "404 - Page Not Found";
  }
}

async function handleFormSubmission(event) {
  event.preventDefault();

  const code = codeInput.value.trim();
  submitButton.disabled = true;
  await validateAndOpenInvitation(code);
  submitButton.disabled = false;
}

codeForm.addEventListener("submit", handleFormSubmission);
