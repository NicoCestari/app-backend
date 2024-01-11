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

    id = 0;
    products = [];

    addProduct(title, description, price, image, stock) {
        this.products.push({id: this.id, title, description, price, image, stock})
        this.id++;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find( prod => prod.id == id);
    }

    getLimitProduct(limit) {
        return this.products.slice( prod =>prod.limit == limit);
    }
}



// Ruta al archivo donde se guardarán los productos
let productManager = new ProductManager();

productManager.addProduct("CanCat", "Mordillo", 2500, "img1", 5);
productManager.addProduct("Trixie", "Pelota gatos", 5000, "img2", 15);
productManager.addProduct("Tetra", "Alimento para Peces", 6800, "img3", 10);
productManager.addProduct("Golocan", "Alimento carne, pollo y chocolate x250gr", 1800, "img4", 120);
productManager.addProduct("Tetramin", "Alimento para Peces agua fria x800gr", 11000, "img5", 20);
productManager.addProduct("Cartocat", "Rascador carton", 7000, "img6", 100);
productManager.addProduct("Gatosfera", "Transportador de Gatos", 16800, "img7", 5);
productManager.addProduct("Lince", "SnackBall", 4000, "img8", 20);
productManager.addProduct("Golocan", "Alimento Manzana, Frutilla y Durazno x 500gr", 6800, "img9", 16);
productManager.addProduct("Catnip", "Hierba Gatera", 1500, "img10", 45);


module.exports = productManager;