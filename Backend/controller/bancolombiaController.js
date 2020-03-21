const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const credentials = require("../../credentials.json");
const cheerio = require("cheerio");
var HTMLParser = require('node-html-parser');

const getReports = async (req, res) => {
  const { id, password, url } = credentials;
  console.log('\x1b[0m',"[started BANCOLOMBIA]");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let data = [];
  let info = {
    overview: {},
    movements: []
  }
  try {
    /* ----------------------------------- getting page ----------------------------------- */

    await page.goto(url);
    console.log('\x1b[0m',"goto url");

     /* ----------------------------------- clicking login  ----------------------------------- */
 
    await page.click("#old-btn-transaccional");
    console.log('\x1b[0m',"click en entrar");

    /* ----------------------------------- Filling Document # ----------------------------------- */
    console.log("-- Filling Document number & focusing on input");
    await frameContent.waitForSelector("#username", {
      timeout: 120000
    });
    await frameContent.focus("#username");

    /* ----------------------------------- Filling out input ----------------------------------- */
    console.log(" -- Filling out input");
    await frameContent.$eval(
      "#username",
      (el, value) => (el.value = value),
      id
    );

    /* ----------------------------------- continue to password ----------------------------------- */
    console.log("  -- Continue to password");
    await frameContent.click("#btnGo");
    if ((await page.$("#closeButton")) !== null) {
      console.log("[! closing pop up !]");
      await page.click("#btnGo");
    }


    

    async function init() {
      let pageContent = await page.content();
      const a =  cheerio.load(pageContent);
      const size =  a("#_KEYBRD tbody tr").closest('tr').length
      
      for (let i = 0; i < size; i++) { 
        for (let j = 0; j < 3; i++){  
          a('#_KEYBRD tbody tr').each((i,el) => {
            const num = a(el).find('div.text').text();
            var car = password.slice(i,i+1);
            if (num == car) {
              page.click(".bg_buttonSmall");
            }
        })        
        

        }
      }
  }   
  init();
    /*------------------------------------------*/
    
    







    /* ----------------------------------- PASSWORD INPUT ----------------------------------- */
    /*console.log("   -- PASSWORD INPUT");
    await frameContent.waitForSelector("#password");
    await page.keyboard.type(password.toString(), { delay: 100 });
    await frameContent.$eval(
      "password",
      (el, value) => (el.value = value),
      password
    );
    if ((await page.$("#closeButton")) !== null) {
      console.log("[! closing pop up !]");
      await page.click("#closeButton");
    }

    /* ----------------------------------- SUBMITING PASSWORD ----------------------------------- */
    console.log("!!! SUBMITING PASSWORD !!!");
    await frameContent.click("#btnGo");

    if ((await page.$("#closeButton")) !== null) {
      console.log("[! closing pop up !]");
      await page.click("#closeButton");
    }

    await frameContent.waitFor(15000);
    console.log("... waited 15000 ms");

    if ((await page.$("#closeButton")) !== null) {
      console.log("[! closing pop up !]");
      await page.click("#closeButton");
    }

    /* ----------------------------------- PREVENTIVE screenshot & content ----------------------------------- */
    console.log("               ---                ");
    console.log("[ PREVENTIVE screenshot & content]");
    console.log("               ---                ");

    await page.screenshot({ path: `temp/bcolombia/preventive/preventiveLoggedIn#-#${id}.png` });
    let pageContent = await page.content();
    fs.writeFile(
      `temp/bcolombia/preventive/preventiveLoggedIn#-#${id}.html`,
      pageContent,
      "utf8",
      err => {
        if (err) throw err;
        console.log(`preventiveLoggedIn#-#${id} been saved!`);
      }
    );
    

    /* ----------------------------------- checking for error ----------------------------------- */
    console.log("[ --- Checking for errors ---]");
    if (!frameContent.isDetached()) {
      if ((await frameContent.$("#divMessageCodigo")) !== null) {
        console.log("[! ERROR PRESENT !]");
        data = await frameContent.evaluate(() => {
          const tds = Array.from(
            document.querySelectorAll(".tablaMessage tbody tr td")
          );
          return tds.map(td => td.textContent);
        });
        content = await frameContent.content();
        await browser.close();
        console.log("[Sending error to postman or api caller]");
        if (data.length > 0) {
          throw { code: "already-logged-in", message: data[1] };
        }
      }
    }

    /* ----------------------------------- taking screenshot and grabing content ----------------------------------- */
    console.log('Waiting for ".type-one" ...');
    await page.waitForSelector('.type-one', {timeout: 120000})
    pageContent = await page.content();
    console.log(`[taking LoggedInScreenshot#-#${id}]`);    
    
    console.log(" --- Writing html file --- ");
    fs.writeFileSync(`temp/bcolombia/in/in#-#${id}.html`, pageContent, "utf8", err => {
        if (err) throw err;
        console.log(`---- LoggedIn#-#${id} has been saved!`);
      }
    );

    /* ----------------------------------- grabing basic info from html file  ----------------------------------- */
    
            
    /* ----------------------------------- loging out and closing browser ----------------------------------- */
 
    
  } catch (error) {

    ///
  }
};




module.exports = { getReports};