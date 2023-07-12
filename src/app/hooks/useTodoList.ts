import { create } from 'zustand'
import { Database } from '@/app/types/supabase';
type Todo = Database['public']['Tables']['todos']['Row']

interface TodoListState {
  todolist: Todo[];
  setTodolist: (todolist: Todo[]) => void;
  addTodolist: (todo: Todo) => void;
  removeTodolist: (id: number) => void;
  clearTodolist: () => void;
}

export const useTodoList = create<TodoListState>((set) => ({
  todolist: [],
  setTodolist: (todolist: Todo[]) => set({ todolist }),
  addTodolist: (todo: Todo) => set((state) => ({ todolist: [...state.todolist, todo] })),
  removeTodolist: (id: number) => set((state) => ({ todolist: state.todolist.filter((todo: Todo) => todo.id !== id) })),
  clearTodolist: () => set({ todolist: [] }),
}))
