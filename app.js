const productManager = require("./ProductManager");
const express = require("express");
const app = express();

app.get("/products", (req, res) => {
    let products = productManager.getAllProducts()
    res.send(products);
})


app.get("/products/:id", (req, res) => {
    let id = req.params.id

    let producto = productManager.getProductById(id)
    //console.log(producto);
    if (producto == null) {
        res.status(404).send({ mensaje: "El producto con ese ID no existe" });
    } else {
        res.send(producto);

    }

})

app.get("/products/:limit", (req, res) => {

    console.log("limit:", limit);

    let limit = parseInt(req.params.limit);
    res.send(isNaN(limit) ? 
    productManager.getAllProducts() : 
    productManager.getAllProducts().slice(0, limit));
})

app.listen(3000, () => {
    console.log("App ejecutandose en puerto 3000");
});