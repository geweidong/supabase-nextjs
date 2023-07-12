"use client";
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Database } from '@/app/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avator({
  image,
  userName,
}: {
  image?: string;
  userName?: string;
}) {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(image!)

  const downloadImage = useCallback(async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }, [])

  useEffect(() => {
    if (image) downloadImage(image)
  }, [downloadImage, image])

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 relative overflow-hidden rounded-full">
        <Image
          src={avatarUrl ?? ''}
          alt="avatar"
          fill
        />
      </div>
      <span className="text-sm ml-2">你好，{userName}</span>
    </div>
  )
}