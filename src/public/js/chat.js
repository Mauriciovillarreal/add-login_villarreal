const socket = io()

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const input = document.querySelector('#m')
  const messages = document.querySelector('#messages')
  const emailInput = document.querySelector('#email')

  let userEmail = localStorage.getItem('userEmail')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value && (userEmail || emailInput.value)) {
      const message = {
        user: userEmail || emailInput.value,
        message: input.value
      }
      socket.emit('chat message', message)
      input.value = ''
      if (!userEmail) {
        localStorage.setItem('userEmail', emailInput.value)
        emailInput.value = ''
      }
    }
  })

  socket.on('chat message', (msg) => {
    const item = document.createElement('li')
    item.textContent = `${msg.user}: ${msg.message}`
    messages.appendChild(item)
  })
})