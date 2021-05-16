import { Request, Response, NextFunction } from "express";

const multer = require("multer");
const mimeTypes = require("mime-types");
const maxSize = 1 * 1024 * 1024; // for 1MB

const storage = multer.diskStorage({
  destination: "uploads",
  
  filename: function (request, file, cb) {
    const ext = mimeTypes.extension(file.mimetype);
    try {
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "pdf") {
        return cb({message:"Solo se perimte archivos PDF, PNG, JPEG Y JPG"});
      } else {
        console.log('Agregae el ' + ext + " a la carpeta uploads");
        cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
      }
    } catch (error) {
      return cb (error.MulterError);
    }
  },
});

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: maxSize },

  
});
