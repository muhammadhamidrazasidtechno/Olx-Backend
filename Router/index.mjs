import express from "express";
import UserRouter from "./users.mjs";
import AdsRouter from "./ads.mjs";
const Router = express.Router();

Router.use('/user', UserRouter)
Router.use('/ads', AdsRouter)


export default Router