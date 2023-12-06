document.addEventListener("DOMContentLoaded", function() {
    const correctUsername = "admin"; // Reemplaza con el nombre de usuario correcto
    const correctPassword = "pipe"; // Reemplaza con la contraseña correcta

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === correctUsername && password === correctPassword) {
            window.location.href = "../views/gestion.html"; // Redirigir a la página de gestión
        } else {
            alert("Usuario o contraseña incorrectos"); // Mostrar mensaje de error
        }
    });
});
