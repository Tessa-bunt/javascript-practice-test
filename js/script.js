function handleFocus(event) {
    event.target.style.backgroundColor = 'yellow';
}
// Functie om de kleur van het veld te herstellen bij blur
function handleBlur(event) {
    const field = event.target;
    if (!field.value.trim()) {
        field.style.backgroundColor = 'red';
    } else {
        field.style.backgroundColor = 'white';
    }
}

// Functie om te controleren of alle verplichte velden zijn ingevuld
function validateForm() {
    const username = document.getElementById('username');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const consent = document.getElementById('consent');
    const submitButton = document.getElementById('submitButton');

    let isValid = true;

    // Controleer elk veld
    [username, fullname, age].forEach((field) => {
        if (!field.value.trim()) {
            field.style.backgroundColor = 'red';
            isValid = false;
        } else {
            field.style.backgroundColor = 'white';
        }
    });

    // Controleer het e-mailadres
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basis e-mail regex
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        email.style.backgroundColor = 'red';
        isValid = false;
    } else {
        email.style.backgroundColor = 'white';
    }

    // Controleer of de checkbox is aangevinkt
    if (!consent.checked) {
        isValid = false;
    }

    // Update de submit-knop
    submitButton.style.backgroundColor = isValid ? 'green' : '';
    return isValid;
}

// Functie om het formulier te verwerken en een cookie te zetten
function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        // Verhoog de teller in de cookie
        const submissionCount = parseInt(getCookie('submissionCount') || '0', 10) + 1;
        document.cookie = `submissionCount=${submissionCount}; path=/`;

        // Toon de teller
        document.querySelector('p').textContent = `The form has been submitted ${submissionCount} times`;

        alert('Formulier verzonden');
    } else {
        alert('Vul alles in');
    }
}

// Hulpfunctie om een cookie te verkrijgen
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) return value;
    }
    return null;
}

// Initialisatie van event listeners
document.addEventListener('DOMContentLoaded', () => {
    const fields = document.querySelectorAll('#username, #fullname, #email, #age');
    const form = document.getElementById('user_form');

    // Voeg focus- en blur-listeners toe aan de velden
    fields.forEach((field) => {
        field.addEventListener('focus', handleFocus);
        field.addEventListener('blur', handleBlur);
    });

    // Voeg een submit-listener toe aan het formulier
    form.addEventListener('submit', handleSubmit);

    // Toon het aantal inzendingen bij het laden van de pagina
    const submissionCount = getCookie('submissionCount') || 0;
    document.querySelector('p').textContent = `The form has been submitted ${submissionCount} times`;
});
