export const DocumentResponse: Record<
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_APPROVED"
  | "DOCUMENT_REJECTED"
  | "DOCUMENT_NOT_FOUND"
  | "DOCUMENT_DELETED"
  | "DOCUMENT_ALREADY_REVIEWED",
  { statusCode: number; message: string }
> = {
  DOCUMENT_UPLOADED: {
    statusCode: 201,
    message: "Document uploaded successfully",
  },
  DOCUMENT_APPROVED: {
    statusCode: 200,
    message: "Document approved successfully",
  },
  DOCUMENT_REJECTED: {
    statusCode: 200,
    message: "Document rejected",
  },
  DOCUMENT_NOT_FOUND: {
    statusCode: 404,
    message: "Document not found",
  },
  DOCUMENT_DELETED: {
    statusCode: 200,
    message: "Document deleted successfully",
  },
   DOCUMENT_ALREADY_REVIEWED: {
    statusCode: 400,
    message: "This document has already been reviewed and cannot be reviewed again",
  }
};
