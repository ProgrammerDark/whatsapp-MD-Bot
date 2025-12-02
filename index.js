const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("WhatsApp MD Bot is running");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "creds",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR Code received, scan please!");
});

// Start your client
client.initialize();
