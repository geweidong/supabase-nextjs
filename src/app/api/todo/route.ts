import { NextResponse } from "next/server";
import { Database } from "@/app/types/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { getTodolist } from "@/app/server-actions/getTodoList";

export const POST = async (request: Request) => {
  const user = await getCurrentUser();
  const body = await request.json();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  if (!body?.title) {
    return new NextResponse('Title is required', { status: 400 });
  }
  const { id } = user;
  // add new todo
  const { title } = body;
  const { data } = await createServerComponentClient<Database>({ cookies })
    .from('todos')
    .insert({ title, userId: id, done: false, deleted: false })
    .select();
  
  return NextResponse.json(data?.[0]);
}

export const GET = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const { id } = user;
  const todolist = await getTodolist(id);
  return NextResponse.json(todolist);
}
