const https = require("https"); // Native module, no need to explicitly install
const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = "blacklistFlags=religious,racist";

https.get(`${baseURL}/joke/${categories.join(",")}?${params}`, res => {
    console.log("\n");
    res.on("data", chunk => {
        // On data received, convert it to a JSON object
        let randomJoke = JSON.parse(chunk.toString());
        if (randomJoke.type == "single") {
            // If type == "single", the joke only has the "joke" property
            mess = 'Categories => ' + randomJoke.category + '\n\n' + randomJoke.joke;
            console.log(mess);
            //reply(randomJoke.joke);
            console.log("\n");
        }
        else {
            // If type == "twopart", the joke has the "setup" and "delivery" properties
            mess = 'Categories => ' + randomJoke.category + '\n\n' + randomJoke.setup + '\n' + randomJoke.delivery;
            console.log(mess);
            console.log("\n");
        }
    });
    res.on("error", err => {
        // On error, log to console
        console.error(`Error: ${err}`);
    });
});
