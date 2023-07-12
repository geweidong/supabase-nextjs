import { NextResponse } from "next/server";
import { Database } from "@/app/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";

interface IParams {
  todoId: number;
}

export const POST = async (request: Request, { params }: { params: IParams }) => {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const { completed } = body;

    const { todoId } = params;
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!todoId) {
      return new NextResponse('todo.id is required', { status: 400 });
    }

    // 更新todo
    const { data } = await createServerComponentClient<Database>({ cookies })
      .from('todos')
      .update({ done: completed })
      .match({ id: todoId })
      .select();

    return NextResponse.json(data?.[0]);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
