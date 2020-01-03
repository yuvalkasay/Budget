  function Income(description, amount , id) 
{
    this.description = description;
    this.amount = amount;
    this.id = id;
}

function Expence(description, amount , id)
{
    this.description = description;
    this.amount = amount;
    this.id = id;
}

let incomes = [];

let expences = [];

let idCounterIncome = 1;
let idCounterOutcome = 1;


// ################### INCOMES FUNCTIONS ########################## //

function handleGetIncome(res) 
{
    res.send(incomes);
}


function handleCreateIncome(req,res) 
{
  const newIncome = req.body;
  newIncome.id = idCounterIncome;
  idCounterIncome++;

  if(newIncome.description == "" || !(isNaN(newIncome.description)) || newIncome.amount == "" || newIncome.amount <= 0)
  {
    res.sendStatus(404);
    return;
  }

  // add new icome to incomes array
  incomes.push(newIncome);

  res.status(201).send(newIncome);
}


function handleDeleteIncome(req,res) 
{
    const id = req.params.id;
 
    // check if income exist, if not send 404
    const index = incomes.findIndex(income => income.id == id);
    if(index == -1)
    {
      res.sendStatus(404);  
    }
    else
    {
      // income found
      incomes.splice(index,1);
      res.sendStatus(200);
    }
}


// ##################### EXPENCES FUNCTIONS #################### //


function handleGetExpence(res) 
{
    res.send(expences);
}


function handleCreateExpence(req,res) 
{
// retrive body from request: description, amount
  const newExpence = req.body;
  newExpence.id = idCounterOutcome;
  idCounterOutcome++;

  if(newExpence.description == "" || newExpence.amount == "" || newExpence.amount <= 0)
  {
    res.sendStatus(404);  
    return;
  }
  // add new icome to incomes array
  expences.push(newExpence);

  res.status(201).send(newExpence);
}


function handleDeleteExpence(req,res) 
{
    const id = req.params.id;
  
    // check if income exist , if not send 404
    const index = expences.findIndex(expence => expence.id == id);
    if(index == -1)
    {
      res.sendStatus(404);  
    }
    else
    {
      expences.splice(index,1);
      res.sendStatus(200);
  }
}



module.exports.handleGetIncome = handleGetIncome;
module.exports.handleDeleteIncome = handleDeleteIncome;
module.exports.handleCreateIncome = handleCreateIncome;

module.exports.handleGetExpence = handleGetExpence;
module.exports.handleDeleteExpence = handleDeleteExpence;
module.exports.handleCreateExpence = handleCreateExpence;
