const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getNextId() {
        const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    addProduct(title, description, price, image, code, stock) {
        const newProduct = {
            id: this.getNextId(),
            title,
            description,
            price,
            image,
            code,
            stock
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    updateProduct(productId, updatedProduct) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }

    getAllProducts() {
        return this.products;
    }
}

// Ruta al archivo donde se guardarán los productos
const productManager = new ProductManager('products.json'); 

// Agregar un producto
const newProduct = productManager.addProduct('Producto 1', 'Descripción del producto', 20.99, 'imagen1.jpg', 'ABC123', 50);
console.log('Producto agregado:', newProduct);

// Obtener un producto por ID
const productId = 1;
const foundProduct = productManager.getProductById(productId);
console.log('Producto encontrado por ID:', foundProduct);

// Actualizar un producto
const updatedProduct = { price: 25.99, stock: 60 };
const isUpdated = productManager.updateProduct(productId, updatedProduct);
console.log('Producto actualizado:', isUpdated);

// Eliminar un producto
const isDeleted = productManager.deleteProduct(productId);
console.log('Producto eliminado:', isDeleted);

// Obtener todos los productos
const allProducts = productManager.getAllProducts();
console.log('Todos los productos:', allProducts);