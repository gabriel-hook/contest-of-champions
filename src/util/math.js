function factorial(n) {
    if(factorial.cache === undefined) {
        factorial.cache = { 0:1, 1:1, length:1 };
    }
    if(factorial.cache.length < n) {
        for(let i=factorial.cache.length; i <= n; i++) {
            factorial.cache[ i ] = i * factorial.cache[ i - 1 ];
        }
        factorial.cache.length = n;
    }
    return factorial.cache[ n ];
}

function combination(n, r) {
    let value = n / factorial(r);
    for(let i = n - 1; i > n - r; i--) {
        value *= i;
    }
    return value;
}

const isInRange = (value, min, max) => value >= min && value <= max;

export { factorial, combination, isInRange };
