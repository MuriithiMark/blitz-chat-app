import { Router } from "express";
import multer from "multer";
import * as mime from "mime-types";
import * as uuid from "uuid";


const uploadRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = mime.extension(file.mimetype);
        const filePath = uuid.v4() + file.originalname.replace(" ", "-") + '.' + extension;
        cb(null, filePath);
    }
})

const upload = multer({ storage: storage });

uploadRouter.post("/uploads", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(500).send({ status: 'fail', message: 'file not created' }).end()
    }
    res.status(200).send({
        status: 'success',
        filePath: req.file.path,
        fileType: req.file.mimetype.split('/')[0]
    }).end()
})

export default uploadRouter;