import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { Database } from '@/app/types/supabase'

export const getTodolist = async (userId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
    const todolist = await supabase
        .from('todos')
        .select()
        .eq('userId', userId)
        .order('created_at', { ascending: true });
    return todolist;
}
