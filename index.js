const express = require("express")

const app = express()
const bodyParser = require('body-parser')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database
const connection = require('./database/database')
const login = require('./database/login')
connection
    .authenticate()
    .then(() => {
        console.log("Banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/cadastro", (req, res) => {
    res.render("cadastro")
})

app.post("/cadastrando", (req,res)=>{
    var usuario = req.body.usuario
    var email = req.body.email
    var senha = req.body.senha

    function logins() {
        login.create({
            usuario : usuario,
            email : email,
            senha : senha
        })
    }
    
    login.findOne({
        where: {email:email}
    }).then(email => {
        if(email != null){
            console.log("email repetido")
            res.redirect('/cadastro')
        } else {
            logins()
            res.redirect('/')
        }
        
    }).catch(msgErro => {
        console.log("Erro encontrado")
        console.log(msgErro)
    })
})

app.post('/login', (req, res) => {

    var email = req.body.email
    var senha = req.body.senha
    login.findOne({
        where: {email:email}
    }).then(email => {
        if(email != null && senha == email.senha){
            res.render("perfil", {
                login: email
            })
        } else {
            res.redirect('/')
        }
        
    }).catch(msgErro => {
        console.log("Erro encontrado")
    })

})

app.get('/perfil', (req, res) => {
    res.render('perfil', {
        email:email
    })   
})

app.listen(4000, ()=>{
    console.log("Em funcionamento")
})