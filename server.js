const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const path = require("path")
const ejs = require("ejs")

app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req, res)=>{
    res.render('index.ejs',{data: ''})
})

app.post('/',(req, res)=>{
    const location = req.body.location? req.body.location: "Dhaka"
    const appId = "9ce51d70746821cd2fee4ddab5a7267b"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid="+appId+"&units=metric"
    https.get(url,(response)=>{
        if(response.statusCode === 200){
            response.on("data",(data)=>{
                const weatherData = JSON.parse(data)
                res.render('index.ejs',{data: weatherData})
            })
        }else{
            res.render('index.ejs',{data: "0"})
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Weather app is running on port ${PORT}....`)
})