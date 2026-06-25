import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { upload } from "../../utilities/upload.middleware.js";
import { ZDocumentUpload } from "./document.types.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import documentService from "./document.service.js";
import { body } from "../../utilities/validate.js";
import { authorize } from "../../utilities/authorize.middleware.js";

const router = Router();

router.post("/upload", authenticate, upload.single("fileName"), body(ZDocumentUpload), authorize("Joinee"), async (req, res, next) => {
    try {
      if (!req.file) { 
        return res.send( new ResponseHandler({statucCode: 400, message: "File not present.."}));
      }

      req.body.fileName = req.file.originalname;
      req.body.mimeType = req.file.mimetype;

      const uploadedBy = req.user?.id;
      const identifier = `${req.file.originalname}_document`;  
      req.body.fileName = identifier;
      const result = await documentService.upload(req.body, uploadedBy as string, req.file);   

      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);


router.get("/get-url",async(req,res,next)=>{
    try{
        const key = req.body.s3Key;
        const url = await documentService.getURL(key);
        if(!url)res.send(new ResponseHandler("url not found "))
        res.send(new ResponseHandler(url));

    }catch(e){
        next(e)
    }
})

export default new Route("/document", router);