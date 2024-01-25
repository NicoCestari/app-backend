import express from "express";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import productsRouter from "./routes/products.router.js"
import { Server } from "socket.io";


const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }))


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(express.static(__dirname + "/public"));

app.use("/", productsRouter);

const products = [];
socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on("addProduct", (product) => {
        productsRouter.getProducts().push(product);
        socket.emit("updateProducts", productsRouter.getProducts());
        socket.emit("addProduct", products)
    });

    socket.on("deleteProduct", (productId) => {
        
        const index = productsRouter.getProducts().findIndex((product) => product.id === productId);

       
        if (index !== -1) {
            productsRouter.getProducts().splice(index, 1);
            socket.emit("updateProducts", productsRouter.getProducts());
            socket.emit("deleteProduct", products)
        }
    });
})
