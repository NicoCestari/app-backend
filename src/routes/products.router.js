import express from "express";
const router = express.Router();

let products = [
    { id: 1, name: "hp pavilion", price: 1500 },
    { id: 2, name: "Dell inspiron", price: 2000 },
    { id: 3, name: "Samsung probook 1", price: 1300 },
    { id: 4, name: "Apple m2", price: 2500 },
];
    
    router.get("/", (req, res) => {
      res.render("realTimeProducts", { products });
    });
    
    router.post("/addProduct", (req, res) => {
      const { productName, productPrice } = req.body;
    
      const newProduct = {
        id: id++,
        name: productName,
        price: parseFloat(productPrice),
      };
    
      products.push(newProduct);
      io.emit("updateProducts", products);
    
      res.redirect("/realtimeproducts");
    });
    
    router.get("/getProducts", (req, res) => {
      res.json(products);
    });
    
    router.delete("/deleteProduct/:id", (req, res) => {
      const productId = req.params.id;
    
      const index = products.findIndex((product) => product.id === productId);
    
      if (index !== -1) {
        products.splice(index, 1);
        io.emit("updateProducts", products);
        res.json({ success: true, message: "Producto eliminado exitosamente." });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Producto no encontrado." });
      }
    });
    
    export default() => products;
    