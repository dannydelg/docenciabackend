import { Router } from "express";
import FileController from "../controller/FileController";
import { uploadMiddleware } from "../middlewares/upload";

var multer = require("multer");

var upload = uploadMiddleware.single("curriculum");
const router = Router();
router.get("/", FileController.verCarreras);

router.get("/:id", FileController.verCursos);

router.post("/", uploadMiddleware.single("curriculum"), FileController.upload);

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.json(err);
    } else if (err) {
      console.log(err);
      return res.json(err);
    }

    FileController.upload;
  });
});

export default router;
