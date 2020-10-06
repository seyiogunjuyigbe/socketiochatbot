
var conString = 'http://localhost:3000'
var socket = io.connect(conString);
const messageForm = document.querySelector('#send')
const messageInput = document.querySelector('#message')

const appendMessage = (message) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    chatroom.append(messageElement)
}


socket.emit('new-user')
socket.on('chat-message', (data) => {

})
    

socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`)
})


socket.on('user-disconnected', (name) => {
    appendMessage(`${name} disconnected`)
})
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message);
})

