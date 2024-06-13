"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';

export async function getPreSignedUrl(fileName: string, fileType: string, dirInBucket: string | null) {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const uniqueFileName = `${uuidv4()}.${fileName.split('.').pop()}`;
  const newFileName = dirInBucket ? `${dirInBucket}/${uniqueFileName}` : uniqueFileName;
  const url = await getSignedUrl(client, new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: newFileName,
    ContentType: fileType,
  }), { expiresIn: 60 });

  return { newFileName, url };
}
