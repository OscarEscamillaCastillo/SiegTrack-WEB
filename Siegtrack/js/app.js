const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// Manejador para el botón de mostrar/ocultar contraseña
togglePassword.addEventListener('click', function () {
    // Cambia el tipo de input entre 'password' y 'text'
    const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', tipo);
});

// Manejador para el formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario estándar
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Realizar la petición a backend para verificar las credenciales
    fetch('backend/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Credenciales correctas. Bienvenido!");
            // Redirigir a otra página, si es necesario
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
