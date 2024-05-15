const { productsModel } = require('../models/products.model.js')

class ProductsManagerMongo {
    constructor() {
        this.model = productsModel
    }

    getProducts = async ({limit = 8, numPage = 1}) => {
        try {
            const products = await this.model.paginate({}, {limit , page:numPage, lean: true})
            return products
        } catch (error) {
            console.error("Error occurred while getting products:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    getProductsById = async (pid) => {
        try {
            const product = await this.model.findById(pid)
            if (!product) {
                return res.status(404).json({ error: 'Product not found' })
            }
            return product
        } catch (error) {
            console.error("Error occurred while getting product:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    createProduct = async (productData, res) => {
        try {
            const newProduct = await this.model.create(productData)
            return newProduct
        } catch (error) {
            console.error("Error occurred while creating product:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    updateProductById = async (pid, updateData, res) => {
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(pid, updateData, { new: true })
            if (!updatedProduct) {
                return res.status(404).json({ error: "Product not found" })
            }
            return updatedProduct
        } catch (error) {
            console.error("Error occurred while updating product:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    deleteProductById = async (pid, res) => {
        try {
            const deletedProduct = await this.model.findByIdAndDelete(pid)
            if (!deletedProduct) {
                return res.status(404).json({ error: "Product not found" })
            }
            return deletedProduct
        } catch (error) {
            console.error("Error occurred while deleting product:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

module.exports = ProductsManagerMongo
