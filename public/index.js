// the following variables meant for the top line where we place the current month of the year
let date = new Date();
let year = date.getFullYear();
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
document.getElementById("first-line").innerHTML = 'Available Budget in ' + months[date.getMonth()] + ', ' + year + ':';

let sum_income = 0, sum_expense = 0;

// calling this function to get the data as the page is up
get_income();
get_expences();
            

        function click_on_v()
        {
            if(document.getElementById('select_id').value == 'plus')
            {
                create_income();
            }
            else if (document.getElementById('select_id').value == 'minus')
            {
                create_outcome();
            }
        }

        document.addEventListener('keypress', function(evant) {
            if(evant.keyCode == 13)
            {
                if(document.getElementById('select_id').value == 'plus')
                {
                    create_income();
                }
                else if (document.getElementById('select_id').value == 'minus')
                {
                    create_outcome();
                }
            }
        })
        

        function showIncomes()
        {
            for (let i = 0 ; i < incomes.length; i++) 
            {
                let incomeElement = document.createElement('p');
                incomeElement.classList.add('income-p');
                document.getElementById('div-bottom-income').appendChild(incomeElement);
                incomeElement.innerHTML = `<span class="span-income-description"> ${incomes[i].description} </span> 
                                           <span class="span-income-amount"> ${incomes[i].amount} <span> 
                                           <a href="" class='fa fa-close'></a>`;

                // SUMMING THE INCOME & ADDING IT TO DOM
                // ADDING TO DOM SUM OF INCOMES & OUTCOMES
                //  CACULATE & ADD PRECENTAGE TO DOM
                
                sum_income = sum_income + incomes[i].amount;

                document.querySelector('.income-num').innerHTML = sum_income;
                document.querySelector('.budget').innerText = sum_income+sum_expense;
                document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                
                incomeElement.onclick = function()
                {
                    delete_income(incomes[i].id, this);

                    sum_income = sum_income - incomes[i].amount;
                    document.querySelector('.income-num').innerText = sum_income;
                    document.querySelector('.budget').innerText = sum_income+sum_expense;
                    document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                } 
            }
        }

        function showExpences()
        {
            for (let i = 0; i < expences.length; i++) 
            {
                let expenceElement = document.createElement('p');
                expenceElement.classList.add('expence-p');
                let income_value = document.querySelector('.income-num').innerHTML;
                let round_precentage = Math.round(expences[i].amount/income_value *100)

                document.getElementById('div-bottom-expence').appendChild(expenceElement);
                expenceElement.innerHTML = `<span class="span-income-description"> ${expences[i].description} </span> 
                                            <span class="span-income-amount"> ${expences[i].amount} <span>
                                            <a href="" class='fa fa-close'></a>
                                            <div class="small-precentage">${round_precentage} %</div>`;

                // EXPENCE: SUMMING IT AND ADDING IT TO DOM
                // INCOMES & OUTCOMES: SUM IT AND ADDING IT TO DOM 
                // PRECENTAGE: CACULATE AND ADD TO DOM

                sum_expense = sum_expense - expences[i].amount;

                document.querySelector('.expence-num').innerText = ' ' + sum_expense;
                document.querySelector('.budget').innerText = sum_income+sum_expense;
                document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';

                expenceElement.onclick = function ()
                {
                    delete_expence(expences[i].id, this);

                    sum_expense = sum_expense + expences[i].amount;
                    document.querySelector('.expence-num').innerText = sum_expense;
                    document.querySelector('.budget').innerText = sum_income+sum_expense;
                    document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                }
            }
        }


        // ############## INCOMES ################
        
        function get_income()
        {
            axios.get('/incomes')
            .then(function(response) {
                            
                incomes = response.data;
                console.log(incomes);
                
                showIncomes();
            })
            .catch(function(error) {
                console.log(error);
            })  
        }

        function delete_income(id, thisObject)
        {
            axios.delete(`/incomes/${id}`)
            .then(function (response) {
                
                if(response.status == 200)
                {   
                    const parent = thisObject.parentElement;
                    parent.removeChild(thisObject);
                }
                else 
                {
                    console.log(`error from server: ${response.status}`);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }

        function create_income()
        {
            let description = document.getElementById('description').value;
            let amount = Number(document.getElementById('amount').value);

            axios.post('/incomes', {
                description: description,
                amount: amount
            })
            .then(function (response){
                if(response.status == 201)
                {
                    let incomeElement = document.createElement('p');
                    incomeElement.classList.add('income-p');
                    document.getElementById('div-bottom-income').appendChild(incomeElement);
                    incomeElement.innerHTML = `<span class="span-income-description"> ${response.data.description} </span> 
                                               <span class="span-income-amount"> ${response.data.amount} <span> 
                                               <a href="" class='fa fa-close'></a>`;

                    // SUMMING THE INCOME & ADDING IT TO DOM
                    // ADDING TO DOM SUM OF INCOMES & OUTCOMES
                    // CACULATE & ADD PRECENTAGE TO DOM

                    sum_income = sum_income + amount;
                    
                    document.querySelector('.income-num').innerHTML = sum_income;
                    document.querySelector('.budget').innerText = sum_income+sum_expense;
                    document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                   
                    incomeElement.onclick = function ()
                    {
                        delete_income(response.data.id, this);
                        sum_income = sum_income - amount;
                        document.querySelector('.income-num').innerText = sum_income;
                        document.querySelector('.budget').innerText = sum_income+sum_expense;
                        document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                    } 
                }
                else
                {
                    console.log(`error from server: ${response.status}`);
                }
                
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });   
        }

        
        // ########## EXPENCES ##############
        function get_expences()
        {
            axios.get('/expences')
            .then(function(response) {
                
                expences = response.data;
                console.log(expences);
                showExpences();
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            }) 
        }

        function delete_expence(id, thisObject)
        {
            axios.delete(`/expences/${id}`)
            .then(function (response) {
                if(response.status == 200)
                {   // remove from dom
                    const parent = thisObject.parentElement;
                    parent.removeChild(thisObject);
                }
                else 
                {
                    console.log(`error from server: ${response.status}`);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        
        function create_outcome()
        {
            let description = document.getElementById('description').value;
            let amount = Number(document.getElementById('amount').value)

            axios.post('/expences', {
                description: description,
                amount: amount
            })
            .then(function (response) {
            if(response.status == 201)
            {
                let income_value = document.querySelector('.income-num').innerHTML;
                let expenceElement = document.createElement('p');
                let round_precentage = Math.round(response.data.amount/income_value *100)
                expenceElement.classList.add('expence-p');
                document.getElementById('div-bottom-expence').appendChild(expenceElement);
                expenceElement.innerHTML = `<span class="span-income-description"> ${response.data.description} </span> 
                                            <span class="span-income-amount"> ${response.data.amount} <span>
                                            <a href="" class='fa fa-close'></a>
                                            <div class="small-precentage">${round_precentage} %</div>`;

                // SUMMING THE OUTCOME & ADDING IT TO DOM
                // ADDING TO DOM SUM OF INCOMES & OUTCOMES
                //  CACULATE & ADD PRECENTAGE TO DOM

                sum_expense = sum_expense - amount;

                document.querySelector('.expence-num').innerText = ' ' + sum_expense;
                document.querySelector('.budget').innerText = sum_income+sum_expense;
                document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';

                expenceElement.onclick = function ()
                {
                    delete_expence(response.data.id, this);

                    sum_expense = sum_expense + amount;
                    document.querySelector('.expence-num').innerText = sum_expense;
                    document.querySelector('.budget').innerText = sum_income+sum_expense;  
                    document.querySelector('.expence-precentage').innerHTML = Math.round(sum_expense/sum_income * -100) + '%';
                }
            }
            else
            {
                console.log(`error from server: ${response.status}`);
            }

            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });   
        }

/*
the next 3 function are responsible for swiching the 
color in the input according to the plus/minus select
*/

document.getElementById('description').onfocus = function() {
    if(document.getElementById('select_id').value == 'plus')
    {
        document.getElementById('description').style.border = 'solid 1px #28B9B5';   
        document.getElementById('amount').style.border = '';
        document.getElementById('select_id').style.border = '';
    }
    else
    {
        document.getElementById('description').style.border = 'solid 1px #FF5049';        
        document.getElementById('amount').style.border = '';
        document.getElementById('select_id').style.border = '';

    }
};

document.getElementById('amount').onfocus = function() {
    if(document.getElementById('select_id').value == 'plus')
    {
        document.getElementById('amount').style.border = 'solid 1px #28B9B5';
        document.getElementById('description').style.border = '';  
        document.getElementById('select_id').style.border = '';              
    }
    else
    {
        document.getElementById('amount').style.border = 'solid 1px #FF5049';     
        document.getElementById('description').style.border = '';    
        document.getElementById('select_id').style.border = '';    
    }
};

document.getElementById('select_id').onclick = function() {
    if(document.getElementById('select_id').value == 'plus')
    {
        document.getElementById('select_id').style.border = 'solid 1px #28B9B5';
        document.getElementById('id_icon').style.color = '#28B9B5';
        document.getElementById('description').style.border = '';  
        document.getElementById('amount').style.border = '';  
    }
    else 
    {
        document.getElementById('select_id').style.border = 'solid 1px #FF5049';
        document.getElementById('id_icon').style.color = '#FF5049';
        document.getElementById('description').style.border = '';  
        document.getElementById('amount').style.border = '';  
    }
}