const { Client, LocalAuth } = require("whatsapp-web.js");
const  QRCode = require("qrcode");
const express = require("express");
// // Require database
// const { MongoStore } = require('wwebjs-mongo');
// const mongoose = require('mongoose');
// const env = require('dotenv');config();


const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("WhatsApp MD Bot is running");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "creds",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});


async function init() {
  const phone = "2348142778000"; // your phone number, international format, no + or symbols

  try {
    const code = await client.requestPairingCode(phone, /* showNotification = */ true, 180000);
    console.log('Pairing code:', code);
    // At this point: open WhatsApp on your phone → Settings → Linked Devices → Link a Device → 
    // choose “Enter code” (or “Use phone number instead of QR”) → input the code you just got.
  } catch (err) {
    console.error('Failed to request pairing code:', err);
  }

  client.on('ready', () => {
    console.log('Client ready — connected!');
  });

  client.on('auth_failure', () => {
    console.error('Authentication failure');
  });

  client.initialize();
}

init();
