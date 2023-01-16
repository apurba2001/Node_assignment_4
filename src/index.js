const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const resultSuccess = (num1, num2, operation) =>{
    let result
    switch(operation){
        case "sum":
            result = num1 + num2
            break
        case "difference":
            result = num1 - num2
            break
        case "product":
            result = num1 * num2
            break
        case "division":
            result = num1/num2
            break
        default:
            return operation
    }
    return {
        "status": "success",
        "message": `The ${operation} of given numbers`,
        "result": result
    }
}

const resultFailure = (operation) =>{
    let message
    switch(operation){
        case "sum" || "difference" || "product":
            message = "OverFlow"
            break
        case "division":
            message = "Can not divide by zero"
            break
        case "notNumber":
            message = "Invalid data types"
            break
        default:
            return operation
    }
    return {
        "status": "error",
        "message": message
    }
}

const validate = (num1, num2, operation) =>{
    switch(operation){
        case "sum":
            return num1 >= 1000000 || num2 >= 1000000 || (num1 + num2) >= 1000000 ? resultFailure(operation) : resultSuccess(num1, num2, operation)
        case "difference":
            return num1 >= (num1 - num2) >= 1000000 ? resultFailure(operation) : resultSuccess(num1, num2, operation)  
        case "product":
            return num1 >= 1000000 || num2 >= 1000000 || (num1 * num2) >= 1000000 ? resultFailure(operation) : resultSuccess(num1, num2, operation)
        case "division":
            return num2 ?  resultSuccess(num1, num2, operation) : resultFailure(operation)
        default:
            return operation
    }
}

app.get('/', (req, res)=>{
    res.status(200).send('hello world')
})

app.post('/add', (req, res)=>{
    const num1 = req.body.num1
    const num2 = req.body.num2
    isNaN(num1 * num2) ? res.status(400).send(resultFailure("notNumber")) : res.status(200).send(validate(num1, num2, "sum"))
})

app.post('/sub',(req, res)=>{
    const num1 = req.body.num1
    const num2 = req.body.num2
    isNaN(num1 * num2) ? res.status(400).send(resultFailure("notNumber")) : res.status(200).send(validate(num1, num2, 'difference'))
})

app.post("/multiply", (req, res) =>{
    const num1 = req.body.num1
    const num2 = req.body.num2
    isNaN(num1 * num2) ? res.status(400).send(resultFailure("notNumber")) : res.status(200).send(validate(num1, num2, 'product'))
})

app.post("/devide", (req, res) =>{
    const num1 = req.body.num1
    const num2 = req.body.num2
    isNaN(num1 * num2) ? res.status(400).send(resultFailure("notNumber")) : res.status(200).send(validate(num1, num2, 'division'))
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;