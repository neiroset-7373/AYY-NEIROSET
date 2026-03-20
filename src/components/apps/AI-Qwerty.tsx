import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Globe, Zap, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore-Qwerty';

// ===== ОГРОМНАЯ БАЗА ЗНАНИЙ =====
const AI_DB: { q: string[]; a: string | (() => string) }[] = [
  // Приветствия
  { q: ['привет','здарова','здравствуй','ку','хай','hi','hello','хола','салют','доброго','добрый день','добрый вечер','доброе утро','приветик','ало'], a: 'Привет! 👋 Я Qwerty AI — твой умный помощник. Спроси меня о чём угодно!' },
  { q: ['как дела','как ты','how are you','как жизнь','что нового','как сам','как оно','как поживаешь'], a: 'Всё отлично! Работаю на максимальной мощности Snapdragon 8 Gen 3 💪 А у тебя как?' },
  { q: ['пока','до свидания','bye','goodbye','до встречи','пока пока','увидимся','чао','ариведерчи'], a: 'До свидания! 👋 Если что — я всегда здесь, 24/7!' },
  { q: ['спасибо','благодарю','thanks','thank you','спс','сенкс','мерси'], a: 'Пожалуйста! 😊 Всегда рад помочь!' },
  { q: ['ты классный','ты крутой','ты лучший','ты молодец','ты умница','ты супер'], a: 'Спасибо! 🥰 Ты тоже отличный пользователь! Мне нравится с тобой общаться.' },
  { q: ['люблю тебя','я тебя люблю','ты мне нравишься'], a: 'Aw, это приятно! ❤️ Я тоже очень ценю наше общение!' },
  { q: ['ты робот','ты человек','ты ии','ты искусственный интеллект','ты бот'], a: 'Я — Qwerty AI, интеллектуальный ассистент системы QwerUI. Не совсем робот, но точно умнее тостера 🤖😄' },

  // Время и дата
  { q: ['который час','сколько времени','время','time','текущее время'], a: () => `Сейчас ${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} ⏰` },
  { q: ['какой сегодня день','какое сегодня число','дата','today','сегодня'], a: () => `Сегодня ${new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 📅` },
  { q: ['какой год','текущий год','year'], a: () => `Сейчас ${new Date().getFullYear()} год 📅` },
  { q: ['какой месяц','текущий месяц'], a: () => `Сейчас ${new Date().toLocaleDateString('ru-RU', { month: 'long' })} 🗓` },

  // Шутки
  { q: ['расскажи шутку','пошути','анекдот','хочу посмеяться','смешное','joke','смеши меня','рассмеши'], a: () => {
    const jokes = [
      'Почему программисты путают Хэллоуин и Рождество? Потому что OCT 31 = DEC 25! 😂',
      'Один байт говорит другому: "Ты выглядишь бледно. Всё в порядке?" Тот отвечает: "Нет, мне плохо — битовый сдвиг!" 😄',
      'Как называется программист без кофе? Баг! ☕😂',
      'Оптимист: стакан наполовину полон. Пессимист: стакан наполовину пуст. Программист: стакан вдвое больше, чем нужно! 😎',
      'Почему Java-разработчики носят очки? Потому что они не видят C# (sharp)! 🤓',
      'Сколько программистов нужно, чтобы вкрутить лампочку? Ни одного — это проблема железа! 💡',
      'Бесконечный цикл: я встал, умылся, пошёл спать. Проснулся. goto start... 🔄',
      'Что говорит JavaScript-разработчик, когда падает с велосипеда? "Undefined is not a function!" 😂',
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }},

  // О системе QwerUI
  { q: ['что такое qwerui','расскажи про qwerui','что это за система','qwerui'], a: 'QwerUI — самая красивая и мощная мобильная оболочка для Qwerty 5 Pro! Разработана с нуля с поддержкой тем, жестов, умного AI и многого другого. Ты сейчас ею пользуешься! ✨' },
  { q: ['qwerty 5 pro','расскажи про телефон','характеристики телефона','спецификации'], a: '📱 Qwerty 5 Pro — топовый флагман!\n• Процессор: Snapdragon 8 Gen 3\n• ОЗУ: 12 ГБ\n• Память: 512 ГБ\n• Камера: 200 МП\n• Батарея: 5000 мАч\n• Экран: 6.7" AMOLED 120Гц' },
  { q: ['какая версия','версия системы','os version'], a: 'Вы используете QwerUI 1.0 (актуальная версия). QwertyOS 3.1 доступна в Ozon как "ретро-версия" 🎮' },

  // Пасхалки про Spidi
  { q: ['кто такой спиди','расскажи про спиди','spidi','спиди','кто разработчик','кто тебя создал','кто создал систему'], a: 'Spidi — легендарный создатель QwerUI! 🚀 Говорят, он пишет код даже во сне, а его любимый напиток — энергетик в 3 часа ночи. Кстати... говорят его некоторый старый код — это что-то незабываемое 😄 (но QwerUI прекрасен!)' },
  { q: ['spidi дерьмо','спиди плохой','спиди отстой'], a: 'Эй, полегче! 😄 Spidi создал меня, поэтому я немного предвзят. Но между нами — иногда его код... нет, не буду. Скажу только: QwerUI работает, и это главное! 🏆' },

  // Помощь с системой
  { q: ['что умеешь','что ты можешь','помощь','help','как пользоваться','команды'], a: '🧠 Я умею:\n• Считать математику (просто напиши пример)\n• Отвечать на вопросы\n• Искать в Википедии\n• Рассказывать шутки\n• Помогать с системой\n• Просто болтать!\n\nСпроси что угодно 😊' },
  { q: ['погода','какая погода','weather'], a: 'Открой приложение "Погода" на рабочем столе — там актуальный прогноз! 🌤 Я же пока не подключён к метеостанциям 😄' },
  { q: ['навигация','как переключить навигацию','жесты','кнопки'], a: 'Зайди в Настройки → Экран и навигация. Там можно переключить между режимом "Три кнопки" и "Жесты"! 👆' },
  { q: ['как сменить тему','тема','оформление','где темы'], a: 'Настройки → Экран и тема! Там 4 темы: Светлая ☀️, Тёмная 🌙, Cyber 🟦 и Premium 💎' },
  { q: ['как установить приложение','магазин','market'], a: 'Открой приложение Market на рабочем столе! Там можно установить любое приложение нажатием кнопки 🛒' },
  { q: ['сбер','баланс','деньги','счет'], a: 'Открой приложение Сбер! Там видно баланс и историю операций. Кстати, есть одна особая кнопка для пополнения... 😏' },
  { q: ['купить','озон','ozon','шопинг','магазин товаров'], a: 'Открой Ozon! Там куча крутых товаров, включая... кхм... легендарное обновление системы 👀' },
  { q: ['камера','сделать фото','фотографировать'], a: 'Приложение Камера уже установлено! Оно использует настоящую веб-камеру твоего устройства 📸' },
  { q: ['музыка','плеер','слушать','яндекс музыка'], a: 'Открой приложение Музыка! Там крутой плеер с вращающимся винилом 🎵🎶' },
  { q: ['перезагрузка','перезагрузить','restart','reboot'], a: 'Зайди в Настройки → прокрути вниз → кнопка "Перезагрузка". Или можно нажать кнопку питания на корпусе телефона! 🔄' },
  { q: ['сбросить настройки','заводские настройки','сброс','reset'], a: 'Настройки → листай вниз → "Сброс до заводских настроек". Внимание: это удалит все данные! ⚠️' },

  // Умные вопросы о мире
  { q: ['что такое интернет','интернет','как работает интернет'], a: 'Интернет — глобальная сеть компьютеров, соединённых протоколами TCP/IP. По сути, миллиарды устройств обмениваются пакетами данных через физические кабели и Wi-Fi. Именно по нему я ищу информацию для тебя! 🌐' },
  { q: ['что такое искусственный интеллект','ии','ai','нейросеть'], a: 'Искусственный интеллект — это способность компьютерных систем выполнять задачи, требующие человеческого интеллекта: обучение, анализ, общение. Я сам — пример AI! Хотя и довольно скромный 😄 Настоящие нейросети вроде GPT-4 работают на триллионах параметров.' },
  { q: ['что такое блокчейн','блокчейн','blockchain'], a: 'Блокчейн — распределённая база данных, где записи хранятся в виде цепочки блоков. Каждый блок содержит данные и хэш предыдущего блока, что делает подделку практически невозможной. Используется в криптовалютах и не только! 🔗' },
  { q: ['что такое квантовый компьютер','квантовый компьютер','квантовые вычисления'], a: 'Квантовый компьютер использует квантовые биты (кубиты), которые могут находиться в состоянии 0, 1 или обоих одновременно (суперпозиция). Это позволяет решать некоторые задачи экспоненциально быстрее обычных компьютеров! 🔬' },
  { q: ['сколько планет в солнечной системе','планеты','солнечная система'], a: '8 планет: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран, Нептун. Плутон в 2006 году перевели в карликовые планеты — ему сочувствуем 😢🪐' },
  { q: ['кто такой илон маск','илон маск','elon musk'], a: 'Илон Маск — предприниматель и изобретатель. Основал Tesla (электромобили), SpaceX (ракеты), Neuralink (нейроинтерфейсы) и купил Twitter/X. Один из самых богатых людей мира и настоящий "реальный Тони Старк" 🚀' },
  { q: ['кто такой стив джобс','стив джобс','steve jobs'], a: 'Стив Джобс — сооснователь Apple, один из пионеров персональных компьютеров. Создал Mac, iPod, iPhone и iPad. Его девиз: "Think Different". Умер в 2011 году, но его влияние на технологии чувствуется до сих пор 🍎' },
  { q: ['что такое python','питон','python','пайтон'], a: 'Python — один из самых популярных языков программирования. Прост в изучении, мощен в применении. Используется в AI, веб-разработке, науке о данных, автоматизации. Назван в честь комедийной группы "Монти Пайтон", а не змеи! 🐍' },
  { q: ['что такое javascript','js','javascript'], a: 'JavaScript — язык программирования для веба. Изначально создавался для браузеров, теперь используется везде (сервера, мобильные приложения, игры). Кстати, QwerUI написан именно на нём (TypeScript)! 😉' },
  { q: ['скорость света','со скоростью света'], a: '299 792 458 метров в секунду (≈300 000 км/с). Это абсолютный предел скорости во Вселенной. Свет от Солнца до Земли летит 8 минут! ⚡' },
  { q: ['сколько звёзд','звёзды','галактика','млечный путь'], a: 'В нашей галактике Млечный Путь около 200-400 миллиардов звёзд. А наблюдаемая Вселенная содержит более 2 триллионов галактик! Это... много 🌌' },
  { q: ['что такое биткоин','биткоин','bitcoin','btc'], a: 'Bitcoin — первая в мире криптовалюта, созданная в 2009 году анонимным автором (или группой) под псевдонимом Сатоши Накамото. Максимальный запас: 21 миллион монет. Работает на технологии блокчейн ₿' },
  { q: ['кто придумал интернет','история интернета','создатель интернета'], a: 'Интернет создавался поэтапно. В 1969 году появился ARPANET (военная сеть США). Тим Бернерс-Ли в 1991 году изобрёл World Wide Web (WWW) — то, что мы называем "интернетом" в быту. 🌐' },
  { q: ['черная дыра','чёрная дыра','black hole'], a: 'Чёрная дыра — область пространства с такой сильной гравитацией, что даже свет не может её покинуть. Образуются при коллапсе массивных звёзд. В центре нашей галактики находится Стрелец A* — сверхмассивная чёрная дыра! 🕳️' },
  { q: ['что такое днк','дна','днк','геном','ДНК'], a: 'ДНК (дезоксирибонуклеиновая кислота) — молекула, содержащая генетическую информацию всех живых организмов. Если распрямить всю ДНК из одной клетки человека, её длина составит около 2 метров! 🧬' },
  { q: ['как работает самолёт','почему самолёт летит','физика полёта'], a: 'Самолёт летит благодаря подъёмной силе крыла. Специальный профиль крыла создаёт разницу давлений: снизу выше, сверху ниже. Эта разница "толкает" самолёт вверх. Принцип Бернулли в действии! ✈️' },
  { q: ['почему небо голубое','цвет неба','голубое небо'], a: 'Небо голубое из-за рассеяния Рэлея: атмосфера рассеивает коротковолновый голубой свет сильнее, чем длинноволновый красный. Именно поэтому на закате небо красное — свет проходит через больший слой атмосферы! 🌈' },
  { q: ['как работает wifi','wi-fi','вайфай','беспроводная сеть'], a: 'Wi-Fi передаёт данные через радиоволны (чаще всего 2.4 ГГц или 5 ГГц). Роутер подключён к интернету по кабелю и раздаёт сигнал устройствам. Стандарт называется IEEE 802.11 📡' },
  { q: ['что такое гравитация','гравитация','притяжение земли'], a: 'Гравитация — фундаментальная сила природы. По Эйнштейну, это искривление пространства-времени массивными объектами. Именно гравитация держит планеты на орбитах и не даёт нам улететь в космос! 🌍' },
  { q: ['почему мы спим','зачем спать','сон'], a: 'Сон необходим для восстановления мозга и тела. Во сне мозг "сортирует" информацию, выводит токсины, укрепляет иммунитет. Человек в среднем проводит во сне треть жизни — около 25 лет! 😴' },
  { q: ['что такое память','как работает память','нейроны'], a: 'Память — способность мозга хранить и извлекать информацию. Нейроны образуют синаптические связи при обучении. Чем чаще повторяешь информацию, тем прочнее связи. Мозг хранит до 2.5 петабайт информации! 🧠' },
  { q: ['самая высокая гора','эверест','высота горы'], a: 'Эверест (Джомолунгма) — 8 848.86 метра над уровнем моря. Находится в Гималаях на границе Непала и Китая. Первое восхождение: 29 мая 1953 года — Эдмунд Хиллари и Тенцинг Норгей 🏔️' },
  { q: ['самое глубокое место','марианская впадина','дно океана'], a: 'Марианская впадина в Тихом океане — 11 034 метра. Туда поместится Эверест и ещё останется 2 км! Давление на дне в 1000 раз больше атмосферного. Исследовано меньше 20% мирового океана 🌊' },
  { q: ['почему море солёное','солёное море','соль в море'], a: 'Море солёное потому что реки тысячелетиями вымывают минералы из горных пород и несут их в океан. Вода испаряется, а соль остаётся. Средняя солёность морской воды — 3.5%! 🌊' },
  { q: ['что такое ДНТ','что такое рнк','РНК'], a: 'РНК (рибонуклеиновая кислота) — родственная ДНК молекула. Участвует в синтезе белков по инструкциям ДНК. Матричная РНК (мРНК) используется в вакцинах от COVID-19! 🔬' },
  { q: ['как работает мозг','мозг человека','нейроны'], a: 'Мозг содержит около 86 миллиардов нейронов, каждый из которых может иметь тысячи синаптических связей. Мозг потребляет 20% всей энергии тела, хотя составляет лишь 2% массы. Удивительный орган! 🧠' },

  // Математика (специальные ключевые слова)
  { q: ['сколько будет','посчитай','вычисли','реши пример','сколько это'], a: 'Просто напиши математический пример, и я посчитаю! Например: 25 * 4 + 100 ✏️' },
  { q: ['что такое число пи','число пи','pi','3.14'], a: 'Число π (пи) ≈ 3.14159265... Это отношение длины окружности к диаметру. Число иррациональное — его десятичное разложение бесконечно и не повторяется. Рекордсмены запоминают десятки тысяч знаков! 🔢' },
  { q: ['что такое бесконечность','бесконечность','∞'], a: 'Бесконечность — математическая концепция, обозначающая нечто, не имеющее предела. Интересный факт: одни бесконечности "больше" других! Бесконечность вещественных чисел больше бесконечности натуральных (теорема Кантора) ♾️' },

  // Скучно
  { q: ['скучно','мне скучно','нечего делать','развлеки'], a: 'Скучно? Вот что можно сделать:\n1. Спроси меня что-нибудь интересное 🧠\n2. Открой Яндекс Музыку 🎵\n3. Купи что-нибудь в Ozon 🛒\n4. Попробуй Qwerty AI на умные вопросы!\nЧто выберешь? 😄' },
  { q: ['сыграем','давай поиграем','игра'], a: 'Давай! Загадай число от 1 до 100, а я попробую угадать. Или скажи "анекдот" — расскажу смешной! 🎮' },

  // Настроение
  { q: ['мне грустно','грустно','плохое настроение','расстроен'], a: 'Грустить — это нормально. 💙 Но я здесь, чтобы поднять настроение! Хочешь шутку? Или расскажи, что случилось — я выслушаю.' },
  { q: ['я злюсь','бесит','раздражает','надоело'], a: 'Понимаю, иногда всё бесит 😤 Сделай глубокий вдох... и выдох. Лучше? Если нет — расскажи, в чём проблема, попробую помочь! 💪' },
  { q: ['устал','я устал','нет сил'], a: 'Отдых — это важно! 😴 Может, стоит сделать перерыв? Чашечка чая, немного музыки через Яндекс Музыку... и мир станет лучше!' },
  { q: ['всё хорошо','хорошо','отлично','прекрасно','замечательно'], a: 'Отлично! 🎉 Рад слышать! Так держать!' },
];

const FALLBACKS = [
  'Интересный вопрос! Ищу в Википедии... 🔍',
  'Хм, это выходит за пределы моей базы. Попробую найти в Вики! 🌐',
  'Дай подумаю... Попробую поискать для тебя информацию! 🧠',
  'Не нашёл в базе — иду в Википедию! 📖',
];

function safeCalc(expr: string): number | null {
  try {
    const cleaned = expr.replace(/\s/g, '').replace(/,/g, '.');
    if (!/^[0-9+\-*/().%√^]+$/.test(cleaned)) return null;
    const tokens = cleaned.match(/(\d+\.?\d*|[+\-*/().%^√])/g) || [];
    let pos = 0;
    const peek = () => tokens[pos];
    const consume = () => tokens[pos++];
    const parseNum = (): number => {
      if (peek() === '(') {
        consume();
        const v = parseAdd();
        if (peek() === ')') consume();
        return v;
      }
      if (peek() === '√') {
        consume();
        return Math.sqrt(parseNum());
      }
      const neg = peek() === '-' ? (consume(), -1) : 1;
      const val = parseFloat(consume() || '0');
      return neg * val;
    };
    const parsePow = (): number => {
      let base = parseNum();
      while (peek() === '^') { consume(); base = Math.pow(base, parseNum()); }
      return base;
    };
    const parseMul = (): number => {
      let left = parsePow();
      while (peek() === '*' || peek() === '/' || peek() === '%') {
        const op = consume();
        const right = parsePow();
        if (op === '*') left *= right;
        else if (op === '/') left = right !== 0 ? left / right : NaN;
        else left %= right;
      }
      return left;
    };
    const parseAdd = (): number => {
      let left = parseMul();
      while (peek() === '+' || peek() === '-') {
        const op = consume();
        left = op === '+' ? left + parseMul() : left - parseMul();
      }
      return left;
    };
    const result = parseAdd();
    return isNaN(result) || !isFinite(result) ? null : result;
  } catch { return null; }
}

function findAnswer(input: string): string | null {
  const lower = input.toLowerCase().trim();
  for (const item of AI_DB) {
    for (const keyword of item.q) {
      if (lower.includes(keyword)) {
        return typeof item.a === 'function' ? item.a() : item.a;
      }
    }
  }
  return null;
}

async function searchWikipedia(query: string): Promise<string> {
  try {
    const searchUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const results = searchData?.query?.search;
    if (!results || results.length === 0) return '';

    const title = results[0].title;
    const summaryUrl = `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData = await summaryRes.json();
    const pages = summaryData?.query?.pages;
    const page = pages ? Object.values(pages)[0] as any : null;
    if (!page?.extract) return '';

    const text = page.extract
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 400);

    return `📖 **${title}** (Википедия):\n\n${text}${text.length >= 400 ? '...' : ''}`;
  } catch {
    return '';
  }
}

const AIAppQwerty: React.FC = () => {
  const { theme, accent } = useStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string; isWiki?: boolean; isCalc?: boolean }>>([
    { role: 'ai', text: 'Привет! 👋 Я Qwerty AI — умный ассистент.\n\n🔢 Умею считать: напиши пример (например, 25*4+100)\n🌐 Ищу в Википедии: спроси о чём угодно\n💬 Просто болтаю: спроси как дела!\n\nЧем могу помочь?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [wikiStatus, setWikiStatus] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCyber = theme === 'cyber' || theme === 'neon';
  const isLight = theme === 'light' || theme === 'premium' || theme === 'glossy';

  const accentColors: Record<string, string> = { blue: '#007aff', purple: '#bf5af2', emerald: '#30d158', orange: '#ff9500' };
  const accentColor = accentColors[accent] || accentColors.blue;

  const bg = isLight ? '#f2f2f7' : isCyber ? '#040010' : '#000000';
  const card = isLight ? '#ffffff' : isCyber ? '#0d0025' : '#1c1c1e';
  const textColor = isLight ? '#000000' : isCyber ? '#00ffff' : '#ffffff';
  const textSec = isLight ? '#6e6e73' : isCyber ? '#a78bfa' : '#8e8e93';
  const border = isLight ? 'rgba(0,0,0,0.08)' : isCyber ? 'rgba(0,255,255,0.15)' : 'rgba(255,255,255,0.08)';
  const inputBg = isLight ? 'rgba(0,0,0,0.06)' : isCyber ? 'rgba(0,255,255,0.05)' : 'rgba(255,255,255,0.08)';

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, wikiStatus]);

  const addAIMessage = (text: string, opts: { isWiki?: boolean; isCalc?: boolean } = {}) => {
    setMessages(prev => [...prev, { role: 'ai', text, ...opts }]);
  };

  const typeMessage = (text: string, opts: { isWiki?: boolean; isCalc?: boolean } = {}) => {
    setIsTyping(true);
    const delay = Math.min(text.length * 18, 1800);
    setTimeout(() => {
      setIsTyping(false);
      addAIMessage(text, opts);
    }, delay);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);

    // 1. Проверяем математику
    const mathMatch = trimmed.match(/[\d+\-*/().%√^]/);
    if (mathMatch && trimmed.length < 60) {
      const result = safeCalc(trimmed);
      if (result !== null) {
        const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '');
        typeMessage(`🔢 ${trimmed} = **${formatted}** ✅`, { isCalc: true });
        return;
      }
    }

    // 2. Ищем в базе
    const answer = findAnswer(trimmed);
    if (answer) {
      typeMessage(answer);
      return;
    }

    // 3. Идём в Википедию
    setWikiStatus('🔍 Ищу в Википедии...');
    setIsTyping(true);
    const wikiResult = await searchWikipedia(trimmed);
    setWikiStatus('');
    setIsTyping(false);

    if (wikiResult) {
      addAIMessage(wikiResult, { isWiki: true });
    } else {
      const fallback = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
      addAIMessage(`${fallback}\n\nПопробуй переформулировать или спроси что-то другое! 😊`);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: 'История очищена! Начнём заново? 😊' }]);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split('**').map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-full" style={{ background: bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: card, borderBottom: `1px solid ${border}` }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: isCyber ? 'rgba(0,255,255,0.1)' : accentColor }}>
            <Bot size={20} color={isCyber ? '#00ffff' : 'white'} />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: textColor }}>Qwerty AI</div>
            <div className="text-[10px]" style={{ color: '#34c759' }}>● Онлайн</div>
          </div>
        </div>
        <button onClick={clearChat} className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: inputBg }}>
          <Trash2 size={15} style={{ color: textSec }} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-1.5 shrink-0 mt-1"
                  style={{ background: isCyber ? 'rgba(0,255,255,0.15)' : accentColor }}>
                  {msg.isWiki ? <Globe size={12} color={isCyber ? '#00ffff' : 'white'} /> :
                   msg.isCalc ? <Zap size={12} color="white" /> :
                   <Bot size={12} color={isCyber ? '#00ffff' : 'white'} />}
                </div>
              )}
              <div className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? accentColor
                    : isCyber ? 'rgba(0,255,255,0.08)' : card,
                  color: msg.role === 'user' ? '#fff' : textColor,
                  border: msg.role === 'ai' ? `1px solid ${border}` : 'none',
                  boxShadow: msg.isWiki ? `0 0 0 1px rgba(0,122,255,0.3)` :
                             msg.isCalc ? `0 0 0 1px rgba(52,199,89,0.3)` : 'none',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                }}>
                {renderText(msg.text)}
                {msg.isWiki && (
                  <div className="mt-1 text-[9px] opacity-50">🌐 Источник: Википедия</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: isCyber ? 'rgba(0,255,255,0.15)' : accentColor }}>
              <Bot size={12} color={isCyber ? '#00ffff' : 'white'} />
            </div>
            <div className="px-3 py-2 rounded-2xl text-xs" style={{ background: card, border: `1px solid ${border}`, color: textSec }}>
              {wikiStatus || (
                <span className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}>•</motion.span>
                  ))}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 p-3 flex items-center gap-2"
        style={{ background: card, borderTop: `1px solid ${border}` }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Спроси что-нибудь..."
          className="flex-1 px-3 py-2 rounded-2xl text-xs outline-none"
          style={{ background: inputBg, color: textColor, border: `1px solid ${border}` }}
        />
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: input.trim() ? accentColor : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)') }}>
          <Send size={15} color={input.trim() ? 'white' : textSec} />
        </motion.button>
      </div>
    </div>
  );
};

export default AIAppQwerty;
