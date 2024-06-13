"use client";

import { AxiosProgressEvent, CancelTokenSource } from "axios";
import { useState } from "react";
import DropzoneComponent from "./dropzone";

enum FileStatus {
  Uploading = "uploading",
  Uploaded = "uploaded",
  Error = "error",
}

interface FileUploadProgress {
  error?: Error | undefined | unknown | null;
  progress: number;
  file: File;
  source: CancelTokenSource | null;
  status: FileStatus;
  newFileName?: string;
}

export interface S3ooshConfig {
  maxTotalFiles: number;
  maxSize: number;
  acceptedFileTypes: {
    [key: string]: string[];
  };
}

interface S3ooshProps {
  config: S3ooshConfig;
  dirInBucket?: string | null;
}

export default function S3oosh({ config, dirInBucket = null }: S3ooshProps) {
  const { maxTotalFiles, maxSize, acceptedFileTypes } = config;
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const [uploadUrls, setUploadUrls] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource,
    fileStatus: FileStatus
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
    );

    setFilesToUpload((prevUploadProgress) =>
      prevUploadProgress.map((item) =>
        item.file.name === file.name
          ? { ...item, progress, source: cancelSource, status: fileStatus }
          : item
      )
    );
    if (progress === 100) {
      setFilesToUpload((prevUploadProgress) =>
        prevUploadProgress.map((item) =>
          item.file.name === file.name
            ? { ...item, status: FileStatus.Uploaded }
            : item
        )
      );
    }
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      const updatedUploadProgress = prevUploadProgress.map((item) =>
        item.file === file && item.status !== FileStatus.Uploading
          ? { ...item, status: FileStatus.Error }
          : item
      );
      return updatedUploadProgress.filter((item) => item.file !== file);
    });

    setUploadUrls((prevUrls) => {
      const newUrls = { ...prevUrls };
      delete newUrls[file.name];
      return newUrls;
    });
  };

  return (
      <DropzoneComponent
        maxTotalFiles={maxTotalFiles}
        maxSize={maxSize}
        acceptedFileTypes={acceptedFileTypes}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        uploadUrls={uploadUrls}
        setUploadUrls={setUploadUrls}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onUploadProgress={onUploadProgress}
        removeFile={removeFile}
        dirInBucket={dirInBucket}
      />
  );
}
