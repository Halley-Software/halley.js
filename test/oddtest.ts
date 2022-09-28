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

const array1 = [{}]

const array2 = [array1]

console.log(array2.flat(Infinity))