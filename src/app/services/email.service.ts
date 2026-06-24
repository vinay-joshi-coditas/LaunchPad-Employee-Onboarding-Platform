import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses";
import { env } from "../../validate-env.js";

const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

export const sendEmail = async (to: string, subject: string, body: string) => {
  await sesClient.send(
    new SendEmailCommand({
      Source:
        env.SES_SENDER_EMAIL,

      Destination: {
        ToAddresses: [to]
      }, 

      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: body
          }
        }
      }
    })
  );
};