import type { Document } from "./document.types.js";

import { uploadFile } from "../../services/s3.service.js";
import { DocumentResponse } from "./document.response.js";
import documentRepo from "./document.repo.js";

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


export default {
    upload
}
