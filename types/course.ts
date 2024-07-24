import { Attachment, Course } from "@prisma/client";

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
