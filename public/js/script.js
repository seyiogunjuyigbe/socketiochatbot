
var conString = window.location.origin
var socket = io.connect(conString);
const messageForm = document.querySelector('#send_container')
const messageInput = document.querySelector('#message')
const chatroom = document.querySelector('#chatroom')
const name = prompt('What is your name?');

const appendMessage = (message) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    chatroom.append(messageElement)
}


appendMessage('You joined');
socket.emit('new-user', name)
socket.on('chat-message', (data) => {
    console.log(data)
    console.log(name)

    appendMessage(`${data.name}: ${data.message}`)
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
    messageInput.value = '';
})


    // send_message.click(function(){
    //     socket.emit('new_message', {message:message.val()})
    // })
    // socket.on('new_message', (data)=>{
    //     console.log(data);
    //     chatroom.append(`<p class='message'> ${data.username}: ${data.message}</p>`)
    // })
    // send_username.click(function(){
    //     console.log(username.val());
    //     socket.emit('change_username', {username:username.val()})
    // })
