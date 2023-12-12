const username = localStorage.getItem('name');
if (!username) {
  window.location.replace('/');
  throw new Error('Username is required');
}

// obtener hora
const getHour = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes}`;
};

// set chat
document.getElementById('user-name').textContent = localStorage.getItem('name');
document.getElementById('last-seen').textContent = `Hoy a las ${getHour()}`;

// referencias HTML
const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');
const usersUlElement = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');

const renderUsers = (users) => {
  usersUlElement.innerHTML = '';
  users.forEach((user) => {
    const liElement = document.createElement('li');
    liElement.innerText = user.name;
    usersUlElement.appendChild(liElement);
  });
};

const renderMessage = (payload) => {
  const { userId, message } = payload;
  const divElement = document.createElement('div');
  divElement.classList.add('message');
  if (userId === socket.id) divElement.classList.add('incoming');
  document.getElementById('last-time-sent').textContent =
    `Hoy a las ${getHour()}`;
  divElement.innerHTML = `<p>${message}</p>`;
  chatElement.appendChild(divElement);
  chatElement.scrollTop = chatElement.scrollHeight; // scroll
};

const socket = io({
  auth: {
    token: 'ABC-123',
    name: username,
  },
});

socket.on('welcome-message', (message) => {
  console.log(message);
});
// cambia estado de connection
socket.on('connect', () => {
  lblStatusOnline.classList.remove('hidden');
  lblStatusOffline.classList.add('hidden');
});
// cambia estado de connection
socket.on('disconnect', () => {
  lblStatusOnline.classList.add('hidden');
  lblStatusOffline.classList.remove('hidden');
});
// renderiza lista de conectados
socket.on('on-clients-changed', renderUsers);
// escuchar mensajes
socket.on('on-message', renderMessage);
/*se puede configurar un id o email para mandar mensajes directos*/
socket.on('on-private-message', renderMessage); 
// enviar mensaje
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value;
  socket.emit('send-message', message);
  // socket.emit('send-private-message', message); //envía a la sala privada
  input.value = '';
});
