Function.prototype.customBind = function (ctx, ...args) {
    return function(...arg) {
        this.apply(ctx, [...args, ...arg]);
    }
}