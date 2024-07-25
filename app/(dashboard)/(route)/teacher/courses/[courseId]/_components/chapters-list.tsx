"use client";
import React, { useEffect, useState } from "react";
import { ChaptersListProps } from "@/types/course";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Edit, Grip } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounting, setIsMounting] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounting(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounting) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"chapters "}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters?.map((chapter, index) => (
              <Draggable
                draggableId={chapter.id}
                key={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border border-slate-200 text-slate-700 rounded-md text-sm mb-4",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",

                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-4 w-4" />
                    </div>
                    <p className="text-sm">
                      {index + 1}. {chapter.title}
                    </p>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Edit
                        onClick={() => onEdit(chapter.id)}
                        className="h-4 w-4 hover:opacity-75 transition cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
