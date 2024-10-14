const express = require("express")
const mongoose = require("mongoose")
const port = 4040
const app = express()
const agentRoute =require("./routes/agentRoute")
const productRoute =require("./routes/productRoute")
const leadsRoute =require("./routes/leadsRoute")
const salesRoute =require("./routes/salesRoute")
const salesSummaryRoutes =require("./routes/salessummaryRoute")

app.use(express.json())
app.use("/api",agentRoute)
app.use("/api",productRoute)
app.use("/api",leadsRoute)
app.use("/api",salesRoute)
app.use("/api",salesSummaryRoutes)

const uri = "mongodb+srv://arvakirank:SrWH7xjSUoXBaeDK@cluster1.lfhhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
// const uri ="mongodb://localhost:27017/data"
mongoose.connect(uri, {dbName:"data", })
    .then(() => {
        console.log("mongodb connected")
    })
    .catch((error) => {
        console.log("database not connected properly", error)
    })

app.listen(port, () => {
    console.log(`server running at${port}`)
})