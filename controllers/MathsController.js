const Calculate = require('../models/calculate');
const Verifications = require('../models/verifications');
const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {

            if(this.HttpContext.path.queryString == '?')
            {
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServicesHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }
            else
            {
                let params = this.HttpContext.path.params;

                if(params.op)
                {
                    let result;
                    let x = parseInt(params.x);
                    let y = parseInt(params.y);
                    let n = parseInt(params.n);

                    
                    if(!Verifications.ValiderOperationXY(params, this) ||!Verifications.ValiderOperationN(params,  this))
                    {
                        return;
                    }

                    switch(this.HttpContext.path.params.op)
                    {
                        case " ":                     
                            this.HttpContext.path.params.op = "+";      
                            result = Calculate.Addition(x,y);
                            break;
                        case "-":
                            result = Calculate.Substraction(x,y);
                            break;
                        case "*":
                            result = Calculate.Multiplication(x,y);
                            break;
                        case "/":
                            result = Calculate.Division(x,y);
                            break;
                        case "%":
                            result = Calculate.Modulo(x,y);
                            break;
                        case "!":
                            result = Calculate.factorial(n);
                            break;
                        case "p":
                            result = Calculate.isPrime(n);
                            break;   
                        case "np":
                            result = Calculate.findPrime(n);
                            break;
                        default:
                            Verifications.ErrorMessage("parameter 'op' is not valid", this);
                            break;

                    }

                    this.HttpContext.path.params.value = result;
                    this.HttpContext.response.JSON(this.HttpContext.path.params);  
                    
                }else{
                    Verifications.ErrorMessage("parameter 'op' is missing", this);
                }
            }
        }
    }