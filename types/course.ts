import { Attachment, Chapter, Course } from "@prisma/client";

export type TitleFormProps = {
  initialData: {
    title: string;
  };
  courseId: string;
};

export type ImageFormProps = {
  initialData: Course;
  courseId: string;
};

export type DescriptionFormProps = {
  initialData: Course;
  courseId: string;
};

export type CategoryFormProps = {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
};

export type PriceFormProps = {
  initialData: Course;
  courseId: string;
};

export type AttachmentFormProps = {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

export type ChaptersFormProps = {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
};

export type ChaptersListProps = {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
};

export type ChapterTitleFormProps = {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
};

export type ChapterDescriptionFormProps = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};
