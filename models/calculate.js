function Addition(x, y)
{
    return x + y;
}

function Substraction(x, y)
{
    return x - y;
}

function Multiplication(x, y)
{
    return x * y;
}

function Division(x, y)
{
    if(x == 0 && y == 0)
    {
        return "NaN";
    }
    else if(y == 0)
    {
        return "Infinity";
    }

    return x / y;
}

function Modulo(x, y)
{
    if(y <= 0)
    {
        return "NaN";
    }
    return x % y;
}

function factorial(n){
    if(n===0||n===1){
      return 1;
    }
    return n*factorial(n-1);
}

function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

function findPrime(n){
    let primeNumer = 0;
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!isPrime(primeNumer)){
            primeNumer++;
        }
    }
    return primeNumer;
}


module.exports = { Addition, Substraction, Multiplication, Division, Modulo, factorial, isPrime, findPrime};