"use client"
import { Course } from '@prisma/client';
import React from 'react'

type CategoryFormProps = {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; }[];
};
const CategoryForm = ({initialData, courseId, options}: CategoryFormProps) => {
  return (
    <div>CategoryForm</div>
  )
}

export default CategoryForm