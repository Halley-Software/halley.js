'use strict';

export default function router() {    
    let routes = []

    function newRoute(routePath, method, callback) {
        routes.push(routePath, method, callback)
    }

    function searchRoute(routePath, method) {
        routes.find((route) => route.routePath === routePath && route.method === method)
    }
    
    function get(route, callback) {
        if (typeof route !== "string") {
            throw new Error("The route must be parsed as a string!")
        }
        newRoute(route, "get", callback)
    }

    function post(route, callback) {
        if (typeof route !== "string") {
            throw new Error("The route must be parsed as a string!")
        }
        newRoute(route, "post", callback)
    }
};