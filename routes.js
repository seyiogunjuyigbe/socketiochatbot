const router = require('express').Router();
const users = require("./seed.json")
router.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello world" })
})
router.get("/chat", (req, res) => {
    return res.status(200).render("chat", { users })
})
module.exports = router;