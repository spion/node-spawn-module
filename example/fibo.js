function fibo(n) {
    if (n <= 1) return 1;
    return fibo(n - 1) + fibo(n - 2);
}
exports.async = function fibo_cb(n, cb) {
    return cb(null, fibo(n));
}

