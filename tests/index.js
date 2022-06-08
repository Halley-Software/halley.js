import http from "node:http";
import events from "node:events";

function Person(name, subname, edad) {
    this.name = name;
    this.subname = subname;
    this.edad = edad;
}

const father = new Person("Juanjo", "Jimenez", 40);