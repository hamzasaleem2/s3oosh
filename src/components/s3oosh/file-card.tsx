import { FileUploadProgress, FileStatus } from "./types";
import { getFileIconAndColor } from "./fileUtils";
import { Progress } from "../ui/progress";
import { Link, X } from "lucide-react";

interface FileCardProps {
  fileUploadProgress: FileUploadProgress;
  thumbnails: Record<string, string>;
  getFileUrl: (file: FileUploadProgress) => string;
  removeFile: (file: File) => void;
}

const FileCard: React.FC<FileCardProps> = ({
  fileUploadProgress,
  thumbnails,
  getFileUrl,
  removeFile,
}) => {
  return (
    <div className="relative group flex flex-col items-center w-full">
    <div className="w-full h-16 sm:h-20 lg:h-24 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative">
      {fileUploadProgress.status === FileStatus.Uploaded && fileUploadProgress.newFileName && (
        <a href={getFileUrl(fileUploadProgress)} target="_blank" rel="noopener noreferrer" className="absolute top-2 left-2 text-gray-500 hover:text-gray-700" onClick={(e) => e.stopPropagation()}>
          <Link size={12} />
        </a>
      )}
      {getFileIconAndColor(fileUploadProgress.file, thumbnails).icon}
    </div>
    <p className="mt-1 md:mt-2 text-gray-800 text-xs sm:text-sm font-medium truncate w-full text-center" title={fileUploadProgress.file.name}>
      {fileUploadProgress.file.name.length > 15 ? fileUploadProgress.file.name.slice(0, 15) + "..." : fileUploadProgress.file.name}
    </p>
    <div className="w-full h-1 mt-1 md:mt-2">
      {(fileUploadProgress.status === FileStatus.Uploading && !fileUploadProgress.newFileName) && (
        <Progress value={fileUploadProgress.progress} className="w-full h-full" />
      )}
    </div>
    {fileUploadProgress.status === FileStatus.Error && (
      <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2 text-center">{String(fileUploadProgress.error)}</p>
    )}
    <button onClick={(e) => { e.stopPropagation(); if (fileUploadProgress.source) fileUploadProgress.source.cancel("Upload cancelled"); removeFile(fileUploadProgress.file); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
      <X size={16} />
    </button>
  </div>
  );
};

export default FileCard;
