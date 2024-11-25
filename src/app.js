const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const sessionRouter = require("./routes/sessions.js")
const handlebars = require("express-handlebars")
const viewsRouter = require("./routes/views.js")
const userRouter = require('./routes/userRouter.js');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const initializePassport = require('../src/config/passport.config.js');
const {generateToken, authToken, passportCall} = require('./utils.js');
const {user} = require('./models/user.js');
const path = require('path')

const SERVER_PORT = 9090;
const app = express();

// Middlewares incorporados de Express
//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Iniciamos la conexión con MongoDB
//Coneccion a la base de datos
const uriDB='mongodb+srv://salinasjorgeluis26:YfPLse2acK8ZLIgb@pasteleria.ybu41.mongodb.net/Pasteleria?retryWrites=true&w=majority&appName=Pasteleria'

const connectMongoDB = async () => {
    try {
        await mongoose.connect(uriDB);
        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
    }
}

connectMongoDB();

app.use(session({
    store: MongoStore.create({
        mongoUrl: uriDB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// Inicializamos handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")

// Routers
app.use('/api/sessions', sessionRouter);
app.use('/', viewsRouter);

const users = []

app.post("/register", (req,res)=>{
    const {first_name,last_name,email,age,password,role} = req.body
    const exists = users.find(user=>user.email === email)
    if(exists){
        res.sendStatus(409)
        console.log("Usuario registrado")
    }else{
        const user ={
            first_name,last_name,email,age,password,role
        }
        console.log(user)
        users.push(user)
        const access_token = generateToken(user)
        res.send({status:"success", access_token})
    }
})

// app.post("/login", (req, res) => {
//     const { email, password } = req.body
//     const user = users.find(user => user.email === email)
//     if (user && user.password === password) {
//         const access_token = generateToken(user)
//         res.send({ status: "success", access_token })
//     } else {
//         res.sendStatus(401)
//     }
// })

//Ruta de login de usuario
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email });
        if (!user) {
        return res.status(400).send({ message: 'Usuario no encontrado' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
        return res.status(400).send({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        // res.send({ token });
        res.send({ status: "success", token })
    } catch (err) {
        res.status(500).send({ message: 'Error en el servidor', error: err.message });
    }
});

app.get("/session", (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    }
    else{
        req.session.counter = 1
        res.send("Bienvenido")
    }
})

app.get("/login", (req,res)=>{
    const {user, password} = req.query
    if(user !== "coder" || password !== "house"){
        res.send("usuario o contraseña inválida")
    }else{
        req.session.user = user
        req.session.admin = true
        res.send("Login OK")
    }
})

app.get("/logout", (req,res)=>{
    req.session.destroy(err=>{
        if(!err){ 
            res.clearCookie("connect.sid")
            res.send("Logout!")
        }
            else res.send({status:"Error al salir", body:err})
    })
})

//Middleware para ruta
function auth(req,res,next){
    if(req.session?.user === "coder" && req.session?.admin){
        return next()
    }
    res.status(401).send("No estas autorizado")
}

app.get("/privado", auth, (req,res)=>{
    res.send("Bienvenido a la sesion privada")
})

// app.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.send(req.user);
// });

app.get('/current', passportCall('jwt'), (req, res) => {
    if (!user) return done(null, false, { messages: "no se encontró el usuario" })
    res.send(req.user);
})

app.listen(SERVER_PORT, () => {
    console.log(`Servidor escuchando por el puerto:  ${SERVER_PORT}`);
});

