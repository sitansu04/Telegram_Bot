const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const telegram_token = process.env.bot_token;
const bot = new TelegramBot(telegram_token, { polling: true });

const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

let title, summery;

async function fetched() {
  let data = await fetch(url);
  let out = await data.json();

  title = out.title;
  summery = out.extract;
  console.log(out, `\n`, out.title, `\n`, out.extract);
}
fetched();

bot.on("message", (msg) => {
  try {
    var text = "wiki";
    const chatId = msg.chat.id;

    if (msg.text.toString().toLowerCase().indexOf(text) === 0) {
      fetched();
      // send a message to the chat acknowledging receipt of their message
      bot.sendMessage(chatId, `Title : ${title}\n Summery : \n ${summery}`);
    }

    if (
      msg.text.toString().toLowerCase() == "hi" ||
      msg.text.toString().toLowerCase() == "hello"
    ) {
      bot.sendMessage(chatId, "Hello  " + msg.from.first_name);
    }
    if (msg.text.toString().toLowerCase() == "bye") {
      bot.sendMessage(chatId, "Bye! Have fun  " + msg.from.first_name);
    }
  } catch (error) {
    console.log(error);
  }
});
