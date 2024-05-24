const socket = io()

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const input = document.querySelector('#m')
  const messages = document.querySelector('#messages')
  const emailInput = document.querySelector('#email')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value && emailInput.value) {
      const message = {
        user: emailInput.value,
        message: input.value
      }
      socket.emit('chat message', message)
      input.value = ''
    }
  })

  socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = `${msg.user}: ${msg.message}`
    messages.appendChild(item)
    messages.scrollTop = messages.scrollHeight
  })
})