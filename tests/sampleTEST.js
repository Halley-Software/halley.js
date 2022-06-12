import express, { Router } from "express";

const app = express();
const router = Router();

router.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});