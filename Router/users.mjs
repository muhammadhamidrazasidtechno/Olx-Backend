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

Router.put('/login',async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).send({ message: "User not found!" })
            return;
        }
        const isCorrectPassword = user.comparePassword(req.body.password);
    
        if (!isCorrectPassword) {
            res.status(404).send({ message: 'Password is incorrect!' })
            return
        }
    

        
        
        const token = user.generateToken()
        user.tokens.push(token)
        await user.save()
        res.send({message:"User Loged In Suceessfully" + token})



    } catch (e) {
        res.send({ message: e.message })
    }
})
Router.put('/forget', verifyToken ,async (req, res) => {
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
export default Router;