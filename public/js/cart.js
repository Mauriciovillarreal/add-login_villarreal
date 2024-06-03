document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        const carts = document.querySelectorAll('.cart')

        carts.forEach(cart => {
            let totalPrice = 0
            const products = cart.querySelectorAll('.product')

            products.forEach(product => {
                const priceElement = product.querySelector('.price')
                const quantityElement = product.querySelector('.quantity')

                if (priceElement && quantityElement) {
                    const price = parseFloat(priceElement.textContent)
                    const quantity = parseInt(quantityElement.textContent)
                    totalPrice += price * quantity
                }
            })

            const totalElement = cart.querySelector('#totalPrice')
            if (totalElement) {
                totalElement.textContent = `$${totalPrice.toFixed(2)}`
            }
        })
    }
})

