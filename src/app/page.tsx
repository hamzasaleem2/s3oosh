import S3oosh from "@/components/s3oosh";

export default function Home() {
  const S3ooshConfig = {
    maxTotalFiles: 10,
    maxSize: 10485760,
    acceptedFileTypes: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "audio/*": [".mp3", ".wav", ".ogg"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
  };

  return (
      <S3oosh config={S3ooshConfig} />
  );
}
