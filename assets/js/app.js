const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
// Corrección en la escritura para seleeccionar las clases agregando un "."
const $n = document.querySelector('.name');
// Eliminamos el # y agregamos "."
const $b = document.querySelector('.blog');
const $l = document.querySelector('.location');

// Traemos los elementos del botón 
const $searchBtn = document.getElementById('search-btn');
const $usernameInput = document.getElementById('username');

// Volvemos la función asincrona con async
async function displayUser(username) {
  $n.textContent = 'cargando...';
  // Mensaje de carga cuando presionamos el botón
  $b.textContent = 'cargando...';
  $l.textContent = 'cargando...';
  const response = await fetch(`${usersEndpoint}/${username}`);

  // Validamos la respuesta
  if (!response.ok) {
      throw new Error(`Error ${response.status}: Usuario no encontrado`);
    }

  // Agregamos data para obtener los datos
  const data = await response.json();

  console.log(data);
  $n.textContent = `Nombre: ${data.name}`;
  $b.textContent = `Blog: ${data.blog}`;
  $l.textContent = `Dirección: ${data.location}`;
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  // Agregamos $ como corrección de sintaxis
  $n.textContent = `Algo salió mal: ${err}`
}

// Creamos el evento del botón para buscar
$searchBtn.addEventListener('click', () => {
    const username = $usernameInput.value;
    if (username) {
        displayUser(username);
    } else {
        alert('Ingresa un nombre de usuario');
    }
});

displayUser('stolinski').catch(handleError);