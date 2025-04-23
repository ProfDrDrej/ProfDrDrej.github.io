
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const recipientInput = document.getElementById("recipientNameInput");
    const submitButton = document.getElementById("submitButton");
    const statusMessage = document.getElementById("statusMessage");

    const azureFunctionUrl = "https://kheder-contact-func-dev.azurewebsites.net/api/ContactFormFunction";

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        statusMessage.textContent = "Sende Nachricht...";

        const formData = {
            recipientsName: recipientInput.value,
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
        };

        try {
            const response = await fetch(azureFunctionUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const resultText = await response.text();

            if (response.ok) {
                statusMessage.textContent = "Nachricht erfolgreich gesendet!";
                statusMessage.style.color = "lightgreen";
                form.reset();
            } else {
                statusMessage.textContent = "Fehler: " + resultText;
                statusMessage.style.color = "red";
            }
        } catch (error) {
            statusMessage.textContent = "Netzwerkfehler: " + error.message;
            statusMessage.style.color = "red";
        } finally {
            submitButton.disabled = false;
        }
    });
});