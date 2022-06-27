import { Halley } from "../lib/core/halley.js";

const halley = new Halley();
const port = 3000 || process.env.PORT

halley.get();

async function initServer(port) {
    await halley.ready(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};

try {
    initServer(port);
} catch (error) {
    console.error(error);
}