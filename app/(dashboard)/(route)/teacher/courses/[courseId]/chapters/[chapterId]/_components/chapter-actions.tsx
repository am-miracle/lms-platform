"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChapterActionsProps } from "@/types/chapter";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/confirm-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted!");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={() => {}}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Publish" : "Unpublished"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
