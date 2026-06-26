import type { Document } from "./document.types.js";

import { s3Client, uploadFile } from "../../services/s3.service.js";
import { DocumentResponse } from "./document.response.js";
import documentRepo from "./document.repo.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../../../validate-env.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../utilities/authorize.middleware.js";
import { DocumentStatus } from "../../utilities/enums.js";

// data: Pick<Document, "taskId" | "fileName" | "mimeType" | "fileSize"

const upload = async (data: Omit<Document, "id">, uploadedBy: string, file?: Express.Multer.File) => {
  try {
    if (!file) throw new Error("No file provided for upload");

    const identifier = data.fileName ?? `${data.taskId}-${Date.now()}`;
    const s3Key = await uploadFile(identifier, file);
    const fileSize = file.size;

    await documentRepo.add({
      taskId: data.taskId,
      uploadedBy,
      fileName: data.fileName,
      mimeType: data.mimeType,
      fileSize,
      s3Key,
      status: "PENDING",
      reviewedBy: null,
      reviewedAt: null,
      rejectionReason: null,
      createdBy: uploadedBy,
      updatedBy: uploadedBy,
    });

    // return created;
    return DocumentResponse.DOCUMENT_UPLOADED;

  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getURL = async(key:string)=>{
    try{
        const command = new GetObjectCommand({
            Bucket: env.S3_BUCKET_NAME,
            Key: key
        });

        return await getSignedUrl(s3Client,command,{expiresIn:3600});


    }catch(e){
        throw(e);
    }
}

const findByTaskId = async (taskId: string) => {
  try {
    return await documentRepo.findByTaskId(taskId);
  } catch (error) {
    throw error;
  }
};


const findByUploadedBy = async (uploadedBy: string) => {
  try {
    return await documentRepo.findByUploadedBy(uploadedBy);
  } catch (error) {
    throw error;
  }
};

const findAll = () => documentRepo.findAll();


const review = async (
  id: string,
  status: DocumentStatus,
  reviewedBy: string,
  rejectionReason?: string,
) => {
  try {
    const doc = await documentRepo.findById(id);
    if (!doc) throw DocumentResponse.DOCUMENT_NOT_FOUND;

    if (doc.status !== DocumentStatus.PENDING) throw DocumentResponse.DOCUMENT_ALREADY_REVIEWED;

    await documentRepo.update(id, {
      status,
      reviewedBy,
      reviewedAt: new Date(),
      rejectionReason: status === DocumentStatus.REJECTED ? (rejectionReason ?? null) : null,
      updatedBy: reviewedBy,
    });

    return status === DocumentStatus.APPROVED ? DocumentResponse.DOCUMENT_APPROVED : DocumentResponse.DOCUMENT_REJECTED;
  } catch (error) {
    throw error;
  }
};


export default {
    upload,
    getURL,
    findAll,
    findByTaskId,
    findByUploadedBy,
    review
}
