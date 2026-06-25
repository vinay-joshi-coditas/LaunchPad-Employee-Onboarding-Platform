import { PutObjectCommand, S3Client }from "@aws-sdk/client-s3";
import { env } from "../../validate-env.js";



export const s3Client =
 new S3Client({
   region: env.AWS_REGION,

   credentials: {
     accessKeyId:
      env.AWS_ACCESS_KEY_ID,

     secretAccessKey:
      env.AWS_SECRET_ACCESS_KEY
   }
 });


 export const uploadFile = async(identifier: string, file: Express.Multer.File) => {
    try {
        const key = `${identifier}-${file.originalname}`;
    
        await s3Client.send(
            new PutObjectCommand({
                Bucket: env.S3_BUCKET_NAME,
                Key: key,
                Body:file.buffer,
                ContentType: file.mimetype
            })
        );
        return key;
        
    } catch (error) {
        throw error;
    }
 };