'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { ArrowLeft, Camera, Edit2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

interface ProfileFormData {
    name: string;
}

const ProfileComponent = ({ 
    preloadedUserInfo 
}: { 
    preloadedUserInfo: Preloaded<typeof api.users.readUser> 
}) => {

    const router = useRouter();
    const [ isEditing, setIsEditing ] = useState(false);
    const userInfo = usePreloadedQuery(preloadedUserInfo);
    const updateUserMutation = useMutation(api.users.updateName);

    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: userInfo?.name || ''
        }
    });

    const onSubmit = async (data: ProfileFormData) => {
        try {
            if(userInfo?.userId) {
                await updateUserMutation({
                    userId: userInfo.userId,
                    name: data.name
                })

                setIsEditing(false);

                router.refresh();
            } else {
                console.error('User not found')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    }


  return (
   <>
    <header className="bg-[#202C33] p-4 flex items-center">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-[#00A884]" />
          </Button>
        </Link>
        <h1 className="text-xl font-normal">Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex flex-col items-center">
          <div className="relative mb-6">
            <Avatar className="h-40 w-40">
              <AvatarImage src={userInfo?.profileImage} alt={userInfo?.name || ""} />
              <AvatarFallback>{userInfo?.name}</AvatarFallback>
            </Avatar>
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-[#00A884] rounded-full p-2 cursor-pointer">
              <Camera className="w-6 h-6 text-[#111B21]" />
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="bg-[#202C33] p-4 rounded-lg">
              <Label htmlFor="name" className="text-[#8696A0] text-sm">Name</Label>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 mt-1">
                  <Input
                    {...register("name", {
                      required: true
                    })}
                    className="bg-transparent border-none text-[#E9EDEF] focus-visible:ring-0"
                    autoFocus
                    onBlur={() => {
                      handleSubmit(onSubmit)
                    }}
                  />
                  <Button type="submit" size="sm" className="bg-[#00A884] hover:bg-[#00957B]">
                    Save
                  </Button>
                </form>
              ) : (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[#E9EDEF]">{userInfo?.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-5 w-5 text-[#00A884]" />
                  </Button>
                </div>
              )}
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">Name is required</span>
              )}
            </div>
            <div className="bg-[#202C33] p-4 rounded-lg">
              <Label className="text-[#8696A0] text-sm">Email</Label>
              <div className="text-[#E9EDEF] mt-1">{userInfo?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileComponent