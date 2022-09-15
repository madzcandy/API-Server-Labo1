const path = require('path');


function isUndefined(param)
{
    return param == undefined;
}

function ErrorMessage(message, obj)
{
    obj.HttpContext.path.params.error = message;
    obj.HttpContext.response.JSON(obj.HttpContext.path.params);
}


function ValiderOperationXY(params, obj)
{
    let valid = true;

    if(params.op == " " || params.op == "-" || params.op == "/" || params.op == "*" || params.op == "%")
    {
        if(isUndefined(params.x ))
        {
            ErrorMessage("x parameter is missing", obj);
            valid = false;
        }
        else if(isUndefined(params.y))
        {
            ErrorMessage("y parameter is missing", obj);
            valid = false;
        }
    
        if(valid && (isNaN(params.x) || isNaN(params.y)))
        {
            ErrorMessage("x and y parameters must be numbers", obj);
            valid = false;
        }
        

        if(valid && Object.keys(params).length > 3)
        {
            ErrorMessage("too many parameters", obj);
            valid = false;
        }
        if(valid && Object.keys(params).length < 3)
        {
            ErrorMessage("not enough parameters", obj);
            valid = false;
        }
    }
    return valid;
}




function ValiderOperationN(params, obj)
{
    let valid = true;

    if(params.op == "n" || params.op == "np" || params.op == "!")
    {
        if(isUndefined(params.n))
        {
            ErrorMessage("n parameter is missing", obj);
            valid = false;
        }

        if(valid && isNaN(params.n))
        {
            ErrorMessage("n parameter must be a number", obj);
            valid = false;
        }

        if(valid && params.op == "!" && params.n < 0)
        {
            ErrorMessage("n parameter must be positive", obj);
            valid = false;
        }

        if(valid && Object.keys(params).length > 2)
        {
            ErrorMessage("too many parameters", obj);
            valid = false;
        }
        else if(valid && Object.keys(params).length < 2)
        {
            ErrorMessage("not enough parameters", obj);
            valid = false;
        }   
    }
    return valid;
}



module.exports = { isUndefined, ErrorMessage, ValiderOperationXY, ValiderOperationN};