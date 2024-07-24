"use client";

import z from "zod";
import axios from "axios";
import { PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttachmentFormProps } from "@/types/course";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment added ");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Course attachment deleted");
      router.refresh();
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error(`Something went wrong ${error}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p
              className={cn(
                "text-sm mt-2",
                initialData.attachments?.length === 0 && "text-slate-500 italic"
              )}
            >
              No file added yet
            </p>
          )}
          {initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData?.attachments?.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border border-sky-200 text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-2">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          {/* TASK: Implement multiple files upload  */}
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
            isSubmitting={isSubmitting}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that your student might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
