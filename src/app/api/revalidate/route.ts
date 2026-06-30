import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = request.headers.get("x-revalidate-secret");

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (body.path) {
      revalidatePath(body.path);
      return NextResponse.json({ revalidated: true, path: body.path });
    }

    return NextResponse.json({ message: "No path provided" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
