var express = require('express');
const app = express();
const path = require('path');
require('dotenv/config')

const port = process.env.PORT || 4000
app.listen(port, function () {
    console.log(`Connected to the server ${port}`)
})


app.use(express.static(path.join(__dirname,'docs')));

app.get('/',function (params) {
    params.sendFile(path.join(__dirname,'docs/index.html'))
})
    
// }(req,res)=>{
//     res.sendFile(path.join(__dirname,'docs/index.html'))
// })