interface Sex {
    hello: string
}

function foo(object: Sex | Sex[]) {

    if(Array.isArray(object)) {
        object.forEach
    }

    if (Object.getPrototypeOf(object) === Object.prototype)
    return object
}

console.log(foo({
    hello: "sexo"
}))