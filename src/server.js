console.log("server is loading ...");
const express = require("express");
const PORT = 8080;
const app = express();
app.use(express.json());

const path = require('path');
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

const routeHelper = require('./incomes_outcomes');


///// INCOMES 

app.get("/incomes", (req, res) => {
  routeHelper.handleGetIncome(res);
});


app.post("/incomes", (req, res) => {
  routeHelper.handleCreateIncome(req,res);
});


app.delete("/incomes/:id",(req,res)=> {
  routeHelper.handleDeleteIncome(req,res);
});



///// EXPENCES 

app.get("/expences", (req,res) => {
  routeHelper.handleGetExpence(res);
});


app.post("/expences", (req, res) => {
  routeHelper.handleCreateExpence(req,res);
});


app.delete("/expences/:id",(req,res)=> {
  routeHelper.handleDeleteExpence(req,res);
});



app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
