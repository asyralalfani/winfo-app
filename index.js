//import package
const express = require('express')
const wifiPassword = require('wifi-password')
const wifi = require('node-wifi')
const app = express()
const port = process.env.PORT || 3000

//get asset file
app.use(express.static('assets'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

//wifi init
wifi.init({
    iface: null
});

//add routing
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/scan', (req, res) => {
    wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
            console.log(error);            
        } else {            
            wifiPassword().then(password => {
                let data = {
                    passWifi: password,
                    detail: currentConnections
                }
                res.send(data)
            });
        }
    });
})

//listen port
app.listen(port, () => console.log(`Running in port ${port}`))