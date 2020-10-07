const router = require('express').Router();
const { safelyParseJSON } = require('./helpers')

const fs = require("fs")
router.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello world" })
})
// Open chat bot
router.get("/chat", (req, res) => {
    return res.status(200).render("chat", { users: data.users })
});
// Fetch all users
router.get('/users', (req, res) => {
    return res.status(200).json({ users })
});
// Add new goal for user
router.post('/goal/:userId', (req, res) => {
    const { goal } = req.body;
    if (!goal) return res.status(400).json({ error: true, message: "New goal is required" })
    fs.readFile("./seed.json", (err, content) => {
        if (err) console.log({ err })
        else {
            if (content) {
                let data = safelyParseJSON(content);
                let user = data.users.find(user => {
                    return user.id === Number(req.params.userId)
                });
                if (!user) return res.status(404).json({ error: true, message: "Invalid User ID" })
                user.goals.push(goal);
                let str = JSON.stringify(data);
                fs.writeFile('seed.json', str, 'utf8', () => {
                    console.log("Data update successful")
                });
                return res.status(200).json({ success: true, message: "Goal updated" })
            }
        }
    })
})
module.exports = router;