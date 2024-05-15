document.addEventListener('DOMContentLoaded', () => {
    const addButtonList = document.querySelectorAll('button')

    addButtonList.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.productId
            try {
                const response = await fetch(`/api/carts/664505f072d9769c8cccb21a/product/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId })
                })
                if (!response.ok) {
                    throw new Error('Error al agregar el producto al carrito')
                }
                const cart = await response.json()
                Toastify({
                    text: 'Producto agregado al carrito',
                    duration: 3000,
                    gravity: "top"
                }).showToast()
            } catch (error) {
                console.error(error)
            }
        })
    })
})