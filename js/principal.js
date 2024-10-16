window.addEventListener('load', function(){
    
    const msgSuccess = this.document.getElementById('msgSuccess');

    const result = JSON.parse(this.localStorage.getItem('result'));

    const btnLogout = this.document.getElementById('btnLogout');

    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);


});


btnLogout.addEventListener('click', function(event) {
    event.preventDefault();

    const tipoDocumento = JSON.parse(localStorage.getItem('result')).tipoDocumento
    const numeroDocumento = JSON.parse(localStorage.getItem('result')).numeroDocumento

    const url = 'http://localhost:8082/login/logout';

    if (!tipoDocumento || !numeroDocumento) {
        alert('Error: no se encontraron las credenciales necesarias.');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.msjError || 'Error en la respuesta de la red');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.resultado) {
            alert('Sesión cerrada con éxito');
            localStorage.removeItem('result');
            window.location.replace('index.html');
        } else {
            alert(data.msjError);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al cerrar sesión: ' + error.message);
    });
});


function mostrarAlerta(msjError){
    msgSuccess.innerHTML = msjError;
    msgSuccess.style.display = 'block';
}