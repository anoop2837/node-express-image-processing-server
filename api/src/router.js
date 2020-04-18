const Router = require('express').Router;
const multer = require("multer");
const router = new Router();


const filename = (req, file, callback) => callback(null, file.originalname);
const fileFilter = (req, file, callback)=>{
    if(file.mimetype !== 'image/png'){
        req.fileValidationError = "Wrong file type";
        callback(null, false, new Error( "wrong file type"));
    }
    else{
        callback(null, true);
    }
}

const storage = multer.diskStorage({destination:"api/uploads", filename})
//const upload = multer({limits: {filesize: 10000},filefilter, storage});
const upload = multer({
    limits: {filesize: 10000},
    fileFilter,
    storage,
  });

router.post('/upload', upload.single('photo'),(req, res)=>{
    if(req.fileValidationError){
       return res.status(400).json({error: req.fileValidationError});
    }
    else{

        return res.status(201).json({success:true});
    }
})
module.exports = router;