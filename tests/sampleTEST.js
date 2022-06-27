"Testing constructor functions";

function Hola(name) {
    this.name = name
}

class Test {
    constructor() {
        this.hola = Hola()
    }
}