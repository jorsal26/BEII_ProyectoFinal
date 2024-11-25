# titulo: Proyecto Final
# autor: Jorge Luis Salinas

# Express + Mongoose
## Consigna
    - Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB llamada “Pasteleria” a través de mongoose.
    - Crear un model de users llamador “user.js” que utilice una colección llamada “users” y tenga la siguiente estructura de datos:
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }

    - Crear un router llamado “sessionRouter.js” que tenga su ruta principal en “/api/sessions”.
    - Crear un router principal llamado “viewsRouter.js” que tenga su ruta principal en “/”.
    - Desarrollar en el router los endpoints correspondientes al CRUD pensado para trabajar con el model de forma asíncrona.
    - Corroborar los resultados con Postman.
    - Implementar el middleware de autenticación JWT.

## Requerimientos
    - Node.js
    - Express
    - Mongoose
    - MongoDB
    - Passport
    - JWT
    - Bcrypt
    - Router
    - Views
    - Handlebars

## Instalación
    - Instalar Node.js
    - Instalar MongoDB
    - Instalar Mongoose
    - Instalar Express
    - Instalar Passport
    - Instalar JWT
    - Instalar Bcrypt
    - Instalar CookieParser
    - Instalar ExpressSession
    - Instalar BodyParser
    - Instalar ConnectMongo
    - Instalar Handlebars
    - Instalar Router

    - Abrir una terminal y ejecutar los siguientes comandos:
        npm install express
        npm install mongoose
        npm install bcrypt
        npm install jsonwebtoken
        npm install passport
        npm install passport-jwt
        npm install passport-local
        npm install connect-mongo
        npm install cookie-parser
        npm install express-session
        npm install body-parser
        npm install nodemon

## Ejecución
    - Abrir una terminal y ejecutar los siguientes comandos:
        nodemon src/app.js  

## Documentación
    - Documentación de Mongoose: https://mongoosejs.com/docs/guide.html
    - Documentación de Express: https://expressjs.com/es/guide/routing.html
    - Documentación de Passport: https://www.passportjs.org/docs/
    - Documentación de JWT: https://jwt.io/introduction/
    - Documentación de Nodemon: https://www.npmjs.com/package/nodemon
    - Documentación de CookieParser: https://www.npmjs.com/package/cookie-parser
    - Documentación de ExpressSession: https://www.npmjs.com/package/express-session
    - Documentación de BodyParser: https://www.npmjs.com/package/body-parser
    - Documentación de ConnectMongo: https://www.npmjs.com/package/connect-mongo
    - Documentación de Bcrypt: https://www.npmjs.com/package/bcrypt
    - Documentación de JsonWebToken: https://www.npmjs.com/package/jsonwebtoken
    - Documentación de PassportJWT: https://www.npmjs.com/package/passport-jwt

## Endpoints
/register
POST /register
{
    "first_name": "John",
	"last_name": "Doe",
	"email": "johndoe@example.com",
	"age": 25,
	"password": "secret",
	"role": "user"
}

/login
POST /login
{
    "email": "johndoe@example.com",
	"password": "secret"
}
