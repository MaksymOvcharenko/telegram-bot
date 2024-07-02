const TelegramBot = require("node-telegram-bot-api");

// Вставте свій токен API тут
const token = "7189239427:AAHa16q8eFY_sr3Pj1xuw0Sk-zx5E1s84TU";

// Створення екземпляра бота
const bot = new TelegramBot(token, { polling: true });

// Створення об'єкту з містами та прямими посиланнями на чати
const cities = {
  Краків: "https://t.me/Ivancom_PL_048",
  Варшава: "https://t.me/ivancom_warszawa",
  Вроцлав: "https://t.me/IvancomWroclaw",
  Гданськ: "https://t.me/IvancomGdansk",
  Катовіце: "https://t.me/Ivancom_Slask",
  "Інше місто": "https://t.me/Ivancom_PL_048",
};

// Функція для відправки посилання на місто з використанням HTML
function sendCityLink(chatId, city, link) {
  bot.sendMessage(chatId, `<a href="${link}">${city}</a>`, {
    parse_mode: "HTML",
  });
}

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отримуємо ім'я користувача
  const username = msg.from.username;

  // Відправляємо клавіатуру з відділеннями
  sendOfficeKeyboard(chatId);

  // Відправляємо окремі повідомлення з посиланнями на офіси
  for (let city in cities) {
    if (cities.hasOwnProperty(city)) {
      const link = cities[city];
      setTimeout(() => {
        sendCityLink(chatId, city, link);
      }, 1000); // Затримка між відправкою повідомлень (1 секунда)
    }
  }
});

// Обробка натискання на кнопку в клавіатурі
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Перевіряємо, чи є текст кнопки серед міст у об'єкті cities
  if (cities.hasOwnProperty(text)) {
    const link = cities[text]; // Отримуємо посилання для обраного міста
    sendCityLink(chatId, text, link);
  }
});

// Функція для відправки клавіатури з кнопками відділень
function sendOfficeKeyboard(chatId) {
  bot.sendMessage(chatId, "Оберіть відділення:", {
    reply_markup: {
      keyboard: [
        [{ text: "Краків" }, { text: "Варшава" }],
        [{ text: "Вроцлав" }, { text: "Гданськ" }],
        [{ text: "Катовіце" }],
        [{ text: "Інше місто" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
}
