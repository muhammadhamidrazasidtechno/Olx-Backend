import express from "express";
import Ad from "../models/adsSchema.mjs"


const Router = express.Router();

Router.post('/add', async (req, res) => {
    try {
        await Ad.create(req.body)
        // await user.save()
        res.send({ message: "Ad added successfully!" })
    } catch (e) {
        res.send({ message: e.message })
    }
})


Router.get('/',async(req,res) => {
    try {
        const adsList = await Ad.find()
        res.send(adsList)
    } catch (e) {
        res.send({ message: e.message })
    }
})

Router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const ad = await Ad.findOne({ _id: req.params.id }); // _id field se record retrieve karna
        if (!ad) {
            return res.status(404).json({ message: "Ad not found" }); // agar ad nahi milta, 404 error send karo
        }
        res.json(ad); // ad ko JSON format mein send karo
    } catch (e) {
        res.status(500).json({ message: e.message }); // agar koi error aati hai, 500 error send karo
    }
});

Router.delete('/delete', async (req, res) => {
    try {
        const adId = req.body.id;
        const deletedAd = await Ad.findByIdAndDelete(adId);
        if (!deletedAd) {
            return res.status(404).json({ message: "Ad not found" });
        }
        res.json({ message: "Ad deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


export default Router