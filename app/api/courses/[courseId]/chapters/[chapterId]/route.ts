import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({
      where: { id: courseId, userId: userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    // Update chapter title in the database
    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    // TODO: handle video upload
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTER_UPDATE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
