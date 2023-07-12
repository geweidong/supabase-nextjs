import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/app/types/supabase'
import AccountForm from './account-form'
import ToasterContext from "@/app/context/ToasterContext"

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <>
    <ToasterContext />
    <AccountForm session={session} />
  </>
}