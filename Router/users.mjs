import express from "express";
import Users from "../models/usersSchema.mjs";
import verifyToken from "../middlewares/verifyToken.mjs";

const Router = express.Router();

Router.post('/add', async (req, res) => {
    try {
        await Users.create(req.body)
        // await user.save()
        res.send({ message: "User registered successfully!" })
    } catch (e) {
        res.send({ message: e.message })
    }
})

Router.put("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send({ message: "User not found!" });
            return;
        }
        const isCorrectPassword = user.comparePassword(req.body.password);

        if (!isCorrectPassword) {
            res.status(404).send({ message: "Password is incorrect!" });
            return;
        }

        const token = user.generateToken();
        user.tokens.push(token);
        await user.save();
        res.send({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
Router.put('/logout', verifyToken ,async (req, res) => {
    let token = req.headers.authorization
    token = token.slice(7)
    console.log(token)
    console.log(req.headers.authorization)
    try {
        const user = await Users.findOne({ email: req.body.email })

        await Users.findByIdAndUpdate(user._id, { $pull: { tokens: token } })
    res.send({ message: 'Logged out successfully!' })
    } catch (e) {
        res.send({ message: e.message })
    }
})
Router.get('/', async (req, res) => {
    try {
        const data = await Users.find()
        res.json({ ok: data })
    } catch (e) {
        res.send(e);
    }
})

Router.put('/forget', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Update user's password
        user.password = newPassword;
        const use =  await user.save();
        console.log(use);


        // Send a success response
        res.json({ message: "Password updated successfully!" });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Internal server error." });
    }
});
export default Router;