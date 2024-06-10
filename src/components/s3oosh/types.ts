import { CancelTokenSource } from "axios";

export enum FileStatus {
  Uploading = "uploading",
  Uploaded = "uploaded",
  Error = "error",
}

export interface FileUploadProgress {
  error?: Error | undefined | unknown | null;
  progress: number;
  file: File;
  source: CancelTokenSource | null;
  status: FileStatus;
  newFileName?: string;
}
