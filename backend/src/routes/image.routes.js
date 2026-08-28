import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { indexImage, searchSimilarImages } from "../controllers/image.controller.js";

const router = express.Router();

router.post("/search",upload.single("file"),searchSimilarImages);
router.post("/index",upload.single("file"),indexImage);

export default router;