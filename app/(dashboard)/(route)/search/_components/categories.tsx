"use client";
import React from "react";
import { Category } from "@prisma/client";
import {
  FcMusic,
  FcFilmReel,
  FcSportsMode,
  FcEngineering,
  FcOldTimeCamera,
  FcMultipleDevices,
  FcSalesPerformance,
  FcBullish,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

type CategoryProps = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  Art: FcEngineering,
  Sports: FcSportsMode,
  //   Business: FcBusiness,
  Music: FcMusic,
  Filming: FcFilmReel,
  Photography: FcOldTimeCamera,
  "Computer Science": FcMultipleDevices,
  Accounting: FcSalesPerformance,
  Other: FcBullish,
};

const Categories = ({ items }: CategoryProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
