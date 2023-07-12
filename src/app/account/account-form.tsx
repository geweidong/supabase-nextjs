'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../types/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avator from '@/app/components/Avator'
import AddTodoForm from '@/app/components/AddTodoForm'
import TodoList from '@/app/components/TodoList'

type Todo = Database['public']['Tables']['todos']['Row']

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [username, setUsername] = useState<string | null>(null)
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    }
  }, [user, supabase])

  const getTodoList = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from('todos')
        .select(`id, title, done`)
        .eq('userId', user?.id)

      if (error && status !== 406) {
        throw error
      }

      console.log(data, 'data')

      if (data) {
        // @ts-ignore
        setTodoList(data)
      }
    } catch (error) {
      alert('Error loading user data!')
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
    getTodoList()
  }, [user, getProfile, getTodoList])

  return (
    <div className="
      p-3
      flex
      justify-center
      items-center
    ">
      <div className="w-[600px] rounded-md ring-1 ring-slate-200 shadow-lg p-5">
        <div className="pb-2 border-b border-slate-200">
          <Avator userName={username!} image={avatar_url ?? ""} />
        </div>
        <AddTodoForm />
        <div className="p-3 flex flex-col">
          <TodoList todoList={todoList} />
        </div>
      </div>
    </div>
  )
}