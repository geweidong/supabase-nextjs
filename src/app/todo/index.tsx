import { useEffect } from "react";
import { Database } from "@/app/types/supabase";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const TodoList = () => {
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    console.log("Hello world");
    supabase.from('todos').select('*').then(({ data, error }) => {
      console.log(data, 'todo数据')
    })
  }, [supabase]);
  
  return (
    <div>
      todo list
    </div>
  )
}

export default TodoList;
