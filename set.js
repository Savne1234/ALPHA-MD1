const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUU3eElOMExQTE9tUzMyM0l6NFBqa3VlNENZSEpteHVTNGx6YUNjbzlHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0R6WUkvcGE3TVljR3hueXJ1eG5ya1VHRkZRYlVkYllkRFpoMy9EcDlsTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQmg5SkZEUWpDMnRIVlpFYWxKUDdxOGk5YzhuVVBTZy9yRUIwdTBYbDFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4OXFrdDkzNWg4TGZuT1ZkbVJRU29hVlhyNTF0bnYrTDQzTjAzUjUvQ1VVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklPM0YvaE5DQUZMMmwwUVMyMjhqTit6N2dwckdGR3ZFbUpYVkFRR3o5bHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNQZHIvOUxiZVdiU0VXV1VaWlRXQUhDSTl4UDY3M0poNTd3cGZtVENKak09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZxL1ZBdm9jQUNQR01VL21oNmx1b2QweUhyT1BKaFQrc012enJzSnIxdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWdMSnFJbUxKcGRnSXVmUElOaDg2dTBtL2x5Z2MyQXBjdlJWTkNPbW9VND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRCZzZKbUhkV1VueWFPTXRHSHN4dkRQNktvRjBZVXhIanlXb2Vtb0JsYjlNK3d1SnlyY1Q2MEVoQkx4QndVazNrVnBDNFRsemV0OW1Sb0Z3RXlNeGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6ImEzaWFaNk45MnR4VWpZT0ZtNWZtZHdrcU9kN3RjTmRodUlZc29iVFpMcFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImlMZTlqWS1mU1FHZWlkZmstV3ZlY0EiLCJwaG9uZUlkIjoiOWJkOGQ1OWItZjQ4NS00NmVjLWI0NjctYzdmZTFkNGJiYzM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFENGhpd3NCb1ZiM2JxeE9vVEhkVURPcFVwQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEci9oVjlCbC8yaXRLMzV6aVlQY1dDQmF3TkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQjlQNUFONUEiLCJtZSI6eyJpZCI6IjIyNDY2OTA5NDg2NTo5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJTGdvREFReDg2UHR3WVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJbThDR25SMGNvamNTeW8xYzM1dDM0cG43VG01djVpN2xtcjgrOXJaclI0PSIsImFjY291bnRTaWduYXR1cmUiOiJMeGNmOU51NFBrNTJMcCtmbHY1dm5mcUxQUE5EVTFUelRTc1Q2WDMwT3RjdzZVbENGaStiZTVGc0hmKzQ1SEhFb1hIa2dCQjh0Mm5FUDFHRFg3cW1Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMlJFSHd1anlDUGpzbmxnVjhvVkc4VSs1RC9WVy9KZms0T3plMnBLRVhrTlorTHZtSHk2RXBuN3NGN3l2UkRzMk5CazlRTEE4Tk1xQUt0TExwSzhsaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjQ2NjkwOTQ4NjU6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTSnZBaHAwZEhLSTNFc3FOWE4rYmQrS1orMDV1YitZdTVacS9QdmEyYTBlIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2MjExOTI1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtUUCJ9',
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
