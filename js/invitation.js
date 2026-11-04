// Activar para probar ambas páginas con la misma invitación simulada.
const USE_TEMPORARY_API_RESPONSE = false;
const TEMPORARY_API_RESPONSE = Object.freeze({
    row: 2,
    code: "TESTPPP",
    name: "Fam. Clarck Smith",
    phone: "8888888",
    adult: 5,
    child: 1,
    guests: 6,
    confirmation: "",
    comments: ""
});

window.InvitationApi = Object.freeze({
    useTemporaryResponse: USE_TEMPORARY_API_RESPONSE,

    async validateCode(inviteCode) {
        if (USE_TEMPORARY_API_RESPONSE) {
            return { ...TEMPORARY_API_RESPONSE };
        }
        if (!inviteCode) return null;

        const requestUrl = new URL("https://hook.us2.make.com/1bs3fr8ptb8uku2aw6rcdfnrdvudbewe");
        requestUrl.searchParams.set("code", inviteCode);

        const response = await fetch(requestUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();

        return response.ok && data?.row
            ? { ...data, code: data.code ?? inviteCode }
            : null;
    }
});
