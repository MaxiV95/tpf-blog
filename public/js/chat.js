//chat.js
// verificación name en localStorage
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
const typingIndicator = document.querySelector('#typing');
const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');
const usersUlElement = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');

// renderiza usuarios
const renderUsers = (users) => {
  usersUlElement.innerHTML = '';
  users.forEach((user) => {
    const liElement = document.createElement('li');
    liElement.innerText = user.name;
    usersUlElement.appendChild(liElement);
  });
};

// renderiza mensajes
const renderMessage = (payload) => {
  const { userId, message } = payload;
  const divElement = document.createElement('div');
  divElement.classList.add('message');
  if (userId === socket.id) divElement.classList.add('incoming');
  document.getElementById('last-time-sent').textContent =
    `Hoy a las ${getHour()}`;
  divElement.innerHTML = `<p>${message}</p>`;
  chatElement.appendChild(divElement);
  chatElement.appendChild(typingIndicator);
  chatElement.scrollTop = chatElement.scrollHeight; // scroll
};

// configuración socket
const socket = io({
  auth: {
    token: 'ABC-123',
    name: username,
  },
});

// cambia a estado de connection
socket.on('connect', () => {
  lblStatusOnline.classList.remove('hidden');
  lblStatusOffline.classList.add('hidden');
});
// cambia a estado de disconnection
socket.on('disconnect', () => {
  lblStatusOnline.classList.add('hidden');
  lblStatusOffline.classList.remove('hidden');
});

// renderiza lista de conectados
socket.on('on-clients-changed', renderUsers);
// escucha mensaje
socket.on('welcome-message', (message) => {
  console.log(message);
});
// escuchar mensajes
socket.on('on-message', renderMessage);
/*se puede configurar un id o email para mandar mensajes directos*/
socket.on('on-private-message', renderMessage);

// enviar mensaje
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value;
  socket.emit('send-message', message);
  input.value = '';
  socket.emit('typing', { isTyping: false });
});
// envía booleano de "escribiendo" hacia el servidor
input.addEventListener('input', () => {
  socket.emit('typing', { isTyping: input.value.length > 0 });
});
// escucha eventos de "escribiendo" desde el servidor
socket.on('on-typing', (data) => {
  const { isTyping } = data;
  showTypingIndicator(isTyping);
});
// mostrar/ocultar las burbujas mientras escribe
const showTypingIndicator = (isTyping) => {
  if (isTyping) {
    typingIndicator.classList.remove('hidden');
  } else {
    typingIndicator.classList.add('hidden');
  }
};
