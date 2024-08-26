import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const unpublishCourse = await db.course.update({
      where: { id: courseId, userId },
      data: { isPublished: false },
    });

    return NextResponse.json(unpublishCourse);
  } catch (error) {
    console.log("COURSE_UNPUBLISHED", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
