var n =  10;
function somatorio(numero){
    console.log(numero);
    if (numero>1){
        return numero+somatorio(numero-1);
    } else {
        return 1;
    }
}
console.log(1);
console.log(somatorio(n));