const fs = require("fs");
const faker = require("faker");
function safelyParseJSON(json) {
    let parsed;
    try {
        parsed = JSON.parse(json);
    } catch (e) {
        return e;
    }
    return parsed;
}
function seedData() {
    // check if json file has been seeded
    fs.readFile("./seed.json", (err, content) => {
        if (err) console.log({ err })
        else {
            if (content) {
                let data = safelyParseJSON(content);
                if (!data.users || data.users.length == 0) {
                    // if not, generate fake data;
                    let arr = [];
                    let obj = {};
                    let str
                    for (var i = 0; i <= 20; i++) {
                        arr.push({
                            id: i + 1,
                            name: faker.name.findName(),
                            goals: new Array(
                                `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
                                `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
                                `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
                                `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
                            )
                        })
                    }
                    obj.users = arr;
                    str = JSON.stringify(obj);
                    fs.writeFile('seed.json', str, 'utf8', () => {
                        console.log("Data update successful")
                    });
                } else {
                    console.log("Users already seeded")
                }
            }
        }
    })

}
module.exports = {
    seedData, safelyParseJSON
}