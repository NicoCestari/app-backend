import express  from "express";
import handlebars from "express-handlebars";
import __dirname from './utils.js';

const app = express();
const users = [
    {name: 'Bowser', last_name: 'Bros', email: 'bowserbros@gmail.com', age: '150', phone: '2468135756'},
    {name: 'Mario', last_name: 'Bros', email: 'mbros@gmail.com', age: '50', phone: '1213643678'},
    {name: 'luiggi', last_name: 'Bros', email: 'lbros@gmail.com', age: '45', phone: '1563213216'},
    {name: 'Toad', last_name: 'Bros', email: 'tbros@gmail.com', age: '20', phone: '1577654329'},
    {name: 'Peache', last_name: 'Bros', email: 'ppbros@gmail.com', age: '40', phone: '1509858931'}
]

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const indice = Math.floor(Math.random() * users.length)

    res.render('index', users[indice]);
})

const server = app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
})