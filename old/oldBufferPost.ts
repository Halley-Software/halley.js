//! Older method to get the body from a post request

/* req.on("data", (chunk) => {
    incomingData.push(chunk)
})
req.on("end", () => {
    const bufferedBody = Buffer.concat(incomingData);
    const SplittedBuffer = bufferedBody.toString("utf-8").split("&");
    for (const item of SplittedBuffer) {
        this.body.push(Object.fromEntries([item.split("=")]));
    }
    console.log(this.body)
}) */