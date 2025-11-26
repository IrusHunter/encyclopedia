// https://github.com/IrusHunter/encyclopedia

function generate10Records() {
  var records = [];

  let titles = [
    "Танк Т-34",
    "Panzer IV",
    "M4 Sherman",
    "Tiger I",
    "Т-90МС",
    "Leopard 2A7",
    "Challenger 2",
    "M1 Abrams",
    "AMX-56 Leclerc",
    "Merkava Mk.4",
  ];

  let authors = [
    "Іван Петренко",
    "Олена Коваль",
    "Сергій Іваненко",
    "Марія Ткаченко",
    "Олег Дуб",
    "Ірина Кравець",
    "Дмитро Лисенко",
    "Анна Гончар",
    "Петро Савчук",
    "Катерина Шевченко",
  ];

  let messageLengths = [45, 62, 51, 70, 33, 57, 66, 42, 59, 48];

  let views = [
    [120, 135],
    [85, 90],
    [94, 100],
    [150, 160],
    [63, 70],
    [72, 80],
    [180, 190],
    [90, 100],
    [110, 120],
    [77, 85],
  ];

  let publishTimes = [
    new Date("2025-11-01T10:15"),
    new Date("2025-11-04T18:25"),
    new Date("2025-11-05T07:50"),
    new Date("2025-11-05T19:05"),
    new Date("2025-11-01T11:20"),
    new Date("2025-11-02T09:45"),
    new Date("2025-11-02T14:10"),
    new Date("2025-11-03T08:55"),
    new Date("2025-11-03T12:30"),
    new Date("2025-11-04T16:40"),
  ];

  for (let i = 0; i < 10; i++) {
    records.push(new Record(i, titles[i], authors[i], messageLengths[i], views[i], publishTimes[i]));
  }

  return records;
}

var id_symbol = Symbol("recordID");
function Record(id, title, author, messageLength, views, publishTime) {
  // Перевірки ==========================================================
  if (!Number.isInteger(id)) throw new Error("id має бути цілим числом");
  if (typeof title !== "string") throw new Error("title має бути рядком");
  if (typeof author !== "string") throw new Error("author має бути рядком");
  if (!Number.isInteger(messageLength) || messageLength <= 0)
    throw new Error("messageLength має бути додатним цілим числом");
  for (let v of views) {
    if (!Number.isInteger(v) || v < 0) throw new Error("кожен елемент views має бути цілим числом ≥ 0");
  }
  if (!(publishTime instanceof Date)) throw new Error("publishTime має бути датою типу Date");

  // Поля ==========================================================
  this[id_symbol] = id;
  this._title = title;
  this._author = author;
  this._messageLength = messageLength;
  this._views = views;
  this._publishTime = publishTime;

  // Методи ==========================================================
  this.toString = function () {
    return (
      `${this[id_symbol]}: ${this._title}, автор ${this._author} ${this._messageLength}с. ` +
      `${this._publishTime.toLocaleString()}, перегляди ${this._views}`
    );
  };
  this.isFull = function () {
    return !(author === null || this._views.length === 0);
  };

  this.getPayment = function () {
    let month = this._publishTime.getMonth() + 1;
    let isSummer = month >= 6 && month <= 8;
    let isWinter = month === 12 || month <= 2;

    let rate = isSummer || isWinter ? 0.95 : 1.1;
    return this._messageLength * rate;
  };

  // Властивості ==========================================================
  this.getPublishedTime = function () {
    return this._publishTime;
  };
  this.getMessageLength = function () {
    return this._messageLength;
  };
  this.getViews = function (day) {
    if (!Number.isInteger(day)) {
      return 0;
    }
    if (day >= this._views.length) {
      return 0;
    }

    return this._views[day];
  };
}

function RecordsService(records) {
  this._records = records;
  this.showRecords = function () {
    for (r of this._records) {
      console.log(r.toString());
    }
  };
  this.sort = function () {
    this._records.sort(function (a, b) {
      return Number(a.getPublishedTime() - b.getPublishedTime());
    });
  };
  this.avgLengthByHour = function (dateObj) {
    if (!(dateObj instanceof Date)) {
      return 0;
    }

    let filtered = this._records.filter((r) => r.getPublishedTime().getTime() === dateObj.getTime());

    if (filtered.length === 0) {
      return 0;
    }

    let sum = 0;
    filtered.forEach(function (r) {
      sum += r.getMessageLength();
    });
    return sum / filtered.length;
  };
  this.minViewsRecordByDay = function (day) {
    if (this._records.length === 0) {
      return null;
    }

    let minRecord = this._records[0];
    for (r of this._records) {
      if (r.getViews(day) < minRecord.getViews(day)) {
        minRecord = r;
      }
    }
    return minRecord;
  };
  this.minViewsRecordIdByDay = function (day) {
    let record = this.minViewsRecordByDay(day);
    if (record === null) {
      return -1;
    }
    return record[id_symbol];
  };
  this.addRecord = function (record) {
    if (!(record instanceof Record)) {
      return;
    }

    if (!record.isFull()) {
      this._records.push(record);
      return;
    }

    this._records.sort(function (a, b) {
      return Number(a.getMessageLength() - b.getMessageLength());
    });

    let inserted = false;
    for (i in this._records) {
      if (record.getMessageLength() < this._records[i].getMessageLength()) {
        this._records.splice(i, 0, record);
        inserted = true;
        break;
      }
    }

    if (!inserted) this._records.push(record);
  };

  this.totalPayment = function () {
    let sum = 0;
    for (r of this._records) {
      sum += r.getPayment();
    }
    return sum;
  };
}

function printChapter(c) {
  const line = "=".repeat(70 - c.length);
  console.log(`\n${c} ${line}`);
}

let recordsService = new RecordsService(generate10Records());
printChapter("1. Основні записи");
recordsService.showRecords();

printChapter("1. Сортування");
recordsService.sort();
recordsService.showRecords();

printChapter("1. Середня довжина повідомлення у конкретний момент часу");
console.log(recordsService.avgLengthByHour(new Date("2025-11-01T10:15")));

printChapter("1. Мінімальна кількість переглядів у добу 2");
console.log(recordsService.minViewsRecordIdByDay(1));

printChapter("1. Додавання нового запису");
recordsService.addRecord(new Record(11, "Нова новина1", "Автор Н", 40, [10, 15], new Date("2025-11-02T10:00")));
recordsService.addRecord(new Record(11, "Нова новина2", "Автор Н", 40, [], new Date("2025-11-02T10:00")));
recordsService.showRecords();

printChapter("1. Сума оплати авторам");
console.log(recordsService.totalPayment());

function generate10Users() {
  let users = [];

  let lastNames = [
    "Шевченко",
    "Коваленко",
    "Рибак",
    "Семенов",
    "Орлов",
    "Мельник",
    "Павленко",
    "Вовк",
    "Захарченко",
    "Кушнір",
  ];

  let firstNames = ["Андрій", "Оксана", "Ігор", "Світлана", "Микола", "Марія", "Ганна", "Руслан", "Петро", "Катерина"];

  let ages = [22, 31, 45, 29, 54, 37, 40, 26, 48, 33];

  let educations = [
    "вища",
    "середня спеціальна",
    "вища",
    "бакалавр",
    "магістр",
    "середня",
    "вища",
    "магістр",
    "бакалавр",
    "вища",
  ];

  let feedbackGoals = [
    "Скарга",
    "Подяка",
    "Питання",
    "Пропозиція",
    "Скарга",
    "Подяка",
    "Питання",
    "Подяка",
    "Скарга",
    "Пропозиція",
  ];

  let dates = [
    new Date("2025-02-03T20:45"),
    new Date("2025-02-03T20:10"),
    new Date("2025-03-11T07:20"),
    new Date("2025-03-11T18:35"),
    new Date("2025-04-01T06:55"),
    new Date("2025-04-01T21:40"),
    new Date("2025-04-02T09:10"),
    new Date("2025-04-02T22:05"),
    new Date("2025-02-10T14:30"),
    new Date("2025-03-15T10:25"),
  ];

  for (let i = 0; i < 10; i++) {
    users.push(new UserRecord(lastNames[i], firstNames[i], ages[i], educations[i], feedbackGoals[i], dates[i]));
  }

  return users;
}

function UserRecord(lastName, firstName, age, education, goal, dateTime) {
  // Перевірки ==========================================================
  if (typeof lastName !== "string") throw new Error("lastName має бути рядком");
  if (typeof firstName !== "string") throw new Error("firstName має бути рядком");
  if (!Number.isInteger(age) || age <= 0) throw new Error("age має бути додатним числом");
  if (typeof education !== "string") throw new Error("education має бути рядком");
  if (typeof goal !== "string") throw new Error("goal має бути рядком");
  if (!(dateTime instanceof Date)) throw new Error("dateTime має бути датою");

  // Поля ==========================================================
  this._lastName = lastName;
  this._firstName = firstName;
  this._age = age;
  this._education = education;
  this._goal = goal;
  this._dateTime = dateTime;

  // Методи ==========================================================
  this.toString = function () {
    return (
      `${this._lastName} ${this._firstName}, ${this._age} р., освіта: ${this._education}, мета: ` +
      `${this._goal}, час: ${this._dateTime.toLocaleString()}`
    );
  };

  // Властивості ==========================================================
  this.getMonth = function () {
    return this._dateTime.getMonth() + 1;
  };
  this.getTime = function () {
    return this._dateTime;
  };
  this.getAge = () => this._age;
  this.getEducation = () => this._education;
  this.getGoal = () => this._goal;
}

function UsersService(users) {
  this._users = users;

  this.showAll = function () {
    for (u of this._users) {
      console.log(u.toString());
    }
  };
  this.usersByMonthAtTime = function (dateObj) {
    if (!(dateObj instanceof Date)) {
      return [];
    }

    return this._users.filter(
      (u) =>
        u.getMonth() === dateObj.getMonth &&
        u.getTime().getHours() === dateObj.getHours() &&
        u.getTime().getMinutes() === dateObj.getMinutes()
    );
  };
  this.maxAgeUser = function () {
    if (this._users.length === 0) return null;

    let maxU = this._users[0];
    for (u of this._users) {
      if (u._age > maxU._age) maxU = u;
    }
    return maxU;
  };
  // Повертає вік, освіту, час звернення найстаршого користувача.
  // Якщо ж список порожній, поверне null.
  this.maxAgeInfo = function () {
    let user = this.maxAgeUser();
    if (user == null) {
      return null;
    }

    return {
      age: user.getAge(),
      education: user.getEducation(),
      time: user.getTime(),
    };
  };

  // класифікує користувачів:
  // сови: час >= 20 або < 6 та мета = скарга/пропозиція
  // жайворонки: час 6–12 та мета подяка/питання
  this.classify = function () {
    let counts = { owls: 0, larks: 0, other: 0 };

    for (let u of this._users) {
      let h = u.getTime().getHours();
      let goal = u._goal.toLowerCase();

      let isOwl = (h >= 20 || h < 6) && (goal.includes("скарга") || goal.includes("пропозиція"));

      let isLark = h >= 6 && h < 12 && (goal.includes("подяка") || goal.includes("питання"));

      if (isOwl) counts.owls++;
      else if (isLark) counts.larks++;
      else counts.other++;
    }

    return counts;
  };
  this.sortByLastName = function () {
    this._users.sort((a, b) => a._lastName.localeCompare(b._lastName));
  };
  this.showAllOnlyGoal = function () {
    for (u of this._users) {
      console.log(u.getGoal());
    }
  };
}

let usersService = new UsersService(generate10Users());

printChapter("2. Усі користувачі");
usersService.showAll();

printChapter("2. Користувачі у лютому о 08:45");
let found = usersService.usersByMonthAtTime(new Date("2025-02-03T08:45"));
found.forEach((u) => console.log(u.toString()));

printChapter("2. Дані користувача з максимальним віком");
let mUserInfo = usersService.maxAgeInfo();
console.log(`вік ${mUserInfo.age}; освіта ${mUserInfo.education}; час звернення ${mUserInfo.time.toLocaleString()};`);

printChapter("2. Класифікація (сови/жайворонки/інші)");
console.log(usersService.classify());

printChapter("2. Сортування за прізвищем");
usersService.sortByLastName();
usersService.showAllOnlyGoal();

printChapter("Кінець");
