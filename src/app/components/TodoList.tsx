"use client";
import { useTodoList } from '@/app/hooks/useTodoList';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Database } from '@/app/types/supabase'
import { toast } from 'react-hot-toast';
type Todo = Database['public']['Tables']['todos']['Row']

const Task = ({
  todo,
}: {
  todo: Todo
}) => {
  const {
    id,
    title,
    done,
  } = todo;
  const {
    setTodolist,
  } = useTodoList();
  const [checked, setChecked] = useState(done);

  useEffect(() => {
    setChecked(done);
  }, [done])

  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    toast.promise(axios.post(`/api/todo/${id}`, {
      completed: e.target.checked,
    }).then((() => {
      axios.get('/api/todo').then((res) => {
        setTodolist(res.data.data);
      })
    })).catch(console.error), {
      loading: 'Loading...',
      success: 'Success!',
      error: 'Error!',
    })
  }, [id, setTodolist])

  return (
    <div className='items-center flex'>
      {/* @ts-ignore */}
      <input type="checkbox" checked={checked} id={`checkbox-${id}`} onChange={onchange} className="
        w-4
        h-4
        rounded
        bg-slate-300
        focus:ring-slate-500
        text-slate-900
        border-transparent
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-slate-50
        focus:ring-opacity-60
        mr-2
      " />
      <label htmlFor={`checkbox-${id}`} className={clsx(`
        text-sm
        font-medium
      `,
        checked && 'text-decoration: line-through'
      )}>{title}</label>
    </div>
  )
}

export default function TodoList({
  todoList
}: {
  todoList: Todo[]
}) {
  const {
    todolist,
    setTodolist,
  } = useTodoList();

  useEffect(() => {
    setTodolist(todoList);
  }, [setTodolist, todoList])

  return (
    <div>
      {todolist.map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </div>
  )
}