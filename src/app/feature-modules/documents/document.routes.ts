import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { upload } from "../../utilities/upload.middleware.js";
import { ZDocumentReview, ZDocumentUpload } from "./document.types.js";
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

router.get(
  "/all",
  authenticate,
  authorize("HR"),
  async (req, res, next) => {
    try {
      const result = await documentService.findAll();
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);


// get all documents for a task:
router.get("/task/:taskId", authenticate, authorize("HR", "Manager"), async (req, res, next) => {
  try {
    const result = await documentService.findByTaskId(req.params.taskId as string);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.get("/my", authenticate, async (req, res, next) => {
  try {
    const result = await documentService.findByUploadedBy(req.user!.id);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

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

router.patch(
  "/:id/review",
  authenticate,
  authorize("HR"), 
  body(ZDocumentReview),
  async (req, res, next) => {
    try {
      const reviewedBy = req.user!.id;
      const { status, rejectionReason } = req.body;
      const result = await documentService.review(req.params.id as string, status, reviewedBy, rejectionReason);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

export default new Route("/document", router);