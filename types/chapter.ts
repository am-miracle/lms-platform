import { Chapter, Course, MuxData } from "@prisma/client";

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

export type ChapterAccessFormProps = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

export type ChapterVideoFormProps = {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
};

export type ChapterActionsProps = {
  courseId: string;
  chapterId: string;
  disabled: boolean;
  isPublished: boolean;
};
