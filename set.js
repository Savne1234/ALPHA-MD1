const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0U3c3VIQTdXb3hPalM0RSt4VHNMa1JwT25tWUFSRnBHM1J1K1hHNnpGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWi96eGp1S0hqUU5ramtiV0RVamM2dXZmeTk3OVFVMCtsTGtES0NEeWV4ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRlFpRmorU2FVK1pQOCtzWnNiNktucTVlL0hvZU9jc0FGMVl5Z2JSRW1FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmcEI1UERTaXZTY3JlN1JYSE9zWGNLdW1JYXN3RWVFbkRaT0c0VFpicENNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFLdDdHRlVoRHA1OEJYcDU0UGEvNklmS3hoU3E5ZTh4RVlXbFRkcysrV2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI3NTlhWktRWThRUHFUSlREVGZJOWphL2JLYXBXSy9Zek94TmZHdkQ1Ujg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ozTkJtTTBuaGx1TTArOUZmOVJLZ29meVJOSkU5OVZ1K3BybE9HOWMyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDNTbzJvZlc1Wm1sM0hyR2JnclRqcDVodkFSeURuMUVaSkptdG1hcGRScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVZMGF6Y3FNSGlSUmVOeXBTNndLV2QyOUdwaUdTUkRWSmJUZHA2VGZXQVkwZXBacUdJZjY4S1ZyYVBsaXh1TnVBUGxKQ21JZ2FkYk10ckFYaDR0bUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6IlFJbXVlWEZBajlXMnJramxQTFJ0ZDA3bGZSTi9DTmZWcXRFdjRjUzl1WlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJtLTZHcmVoUVNXbXdvTjlOQnNoeEEiLCJwaG9uZUlkIjoiZDI0MmVlYWEtZWEyNC00NzQ4LWEwZWItNDgyODUyMmM0ODAxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5iL3VTR0lkRjdwZ1ZjdHRYdFFnaFVTbjZwcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySGZwblpaMlJLaGI2alNyWFVkd2pqZjFINjQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFdRQ1pKSjYiLCJtZSI6eyJpZCI6IjIyNDY2OTA5NDg2NToxMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVRnb0RBUXZyeWt0d1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSW04Q0duUjBjb2pjU3lvMWMzNXQzNHBuN1RtNXY1aTdsbXI4KzlyWnJSND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiczhhVUt2MTF4cHh5U3pqRkFtdlB6ZlZ5QXFhSXBEeGF3WlMvUlJkb0dxMlR3WnU1WllSRnp6TFVsTkdKNlpOa2dldHFoUVkzZW90YnFmSHA0em9wRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IlhaZlN1VnJLSUE2ckdxYlpkWE5TbFdNWVlnaWtKMEtwQjYvTzAzVkVsRDJxUXZKc0xrNjIrYnpYWkg1UDdLMkp3OUhZYTQ0Y2hSVVh4cS9pMkFBU0J3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI0NjY5MDk0ODY1OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNKdkFocDBkSEtJM0VzcU5YTitiZCtLWiswNXViK1l1NVpxL1B2YTJhMGUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY1NTM2NzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS0JzIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "🅰🅽🅾🅽🆈🅼🅾🆄🆂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "224669094865",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '➳ᴹᴿメ 𝐀𝐍𝐎𝐍𝐘𝐌𝐎𝐔𝐒亗',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
