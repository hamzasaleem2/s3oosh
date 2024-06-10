import { FileImage, File as FileIcon, AudioWaveform, Video, FolderArchive } from "lucide-react";
import { FileUploadProgress } from "./types";

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

export const getFileIconAndColor = (file: File, thumbnails: Record<string, string>) => {
  if (file.type.includes(FileTypes.Image) && thumbnails[file.name]) {
    return {
      icon: (
        <img
          src={thumbnails[file.name]}
          alt={file.name}
          className="w-20 h-20 object-contain"
          width={20}
          height={20}
        />
      ),
      color: "",
    };
  }

  if (file.type.includes(FileTypes.Image)) {
    return {
      icon: <FileImage size={40} />,
    };
  }

  if (file.type.includes(FileTypes.Pdf)) {
    return {
      icon: <FileIcon size={40} />,
    };
  }

  if (file.type.includes(FileTypes.Audio)) {
    return {
      icon: <AudioWaveform size={40} />,
    };
  }

  if (file.type.includes(FileTypes.Video)) {
    return {
      icon: <Video size={40} />,
    };
  }

  return {
    icon: <FolderArchive size={40} />,
  };
};

export const generateThumbnails = (filesToUpload: File[]) => {
  const newThumbnails: Record<string, string> = {};

  filesToUpload.forEach((f) => {
    if (f.type.startsWith("image")) {
      const objectUrl = URL.createObjectURL(f as unknown as Blob);
      newThumbnails[f.name] = objectUrl;
    }
  });

  return newThumbnails;
};

export const revokeThumbnails = (thumbnails: Record<string, string>) => {
  Object.values(thumbnails).forEach((url) => URL.revokeObjectURL(url));
};


export const getFileUrl = (file: FileUploadProgress) => {
  const url = `/api/view?fileName=${file.newFileName}`;
  return url;
};