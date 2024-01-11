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
    let limit = req.params.limit

    let productos = productManager.getLimitProduct(limit)
    if(isNaN(limit)) {
        res.status(500).send({mensaje:"Error en el parametro"});
    } else {
        res.send(productos);
    }

    
    
    // req.params.limit? 
    // res.send(productManager.getAllProducts().slice(0, limit)) :
    // res.sendStatus(400)
    
    
})


app.listen(3000, () => {
    console.log("App ejecutandose en puerto 3000");
});