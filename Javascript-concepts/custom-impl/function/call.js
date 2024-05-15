Function.prototype.customCall = function(ctx, ...args) {
    // this.bind(ctx, ...args)();
    if (ctx) {
        const tempProp = Math.round(Math.random() * 5 * 10);
        ctx[tempProp] = this;

        ctx[tempProp](...args);

        delete ctx[tempProp];
    } else {
        this(...args);
    }
}

function showName() {
    console.log(this.name);
}

showName.customCall({name: "Lalit"});