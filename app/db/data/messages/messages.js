"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}
var numberOfMessages = 10;
var messages = [];
for (var i = 0; i < numberOfMessages; i++) {
    messages.push({
        id: faker_1.faker.string.uuid(),
        content: faker_1.faker.lorem.sentence(),
        createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
        userId: Math.floor(Math.random() * 10) + 1,
    });
}
console.log(JSON.stringify(messages, null, 2));
// console.log("Generated messages:", messages);
