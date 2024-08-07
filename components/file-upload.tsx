"use client";
import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

type FileUploadProps = {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  isSubmitting: boolean;
};

export const FileUpload = ({
  onChange,
  endpoint,
  isSubmitting
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
      skipPolling={true}
      disabled={isSubmitting}
    />
  )
}