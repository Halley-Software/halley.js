import { Request as Req, Reply as Res } from "../../../lib/index.js"

async function rawBodyParser(req: Req): Promise<void> {
    let data: string

    for await (const chunk of req) {
        data = Buffer.from(chunk).toString("utf-8")
        for (const str of data) {
            if (str.includes("+")) {
                data = data.replace("+", " ");
            }
        }
       req.body.push(data)
    }

}

export const raw = () => (
    async (req: Req, res: Res) => {
        await rawBodyParser(req)
    }
)