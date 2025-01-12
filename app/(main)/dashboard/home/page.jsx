'use client'
import React from 'react'
import { useAuthContext } from '@/context/AuthContext'

function page() {

  const {globalUserData} = useAuthContext()

  return (
    <div className=''>
      
    </div>
  )
}

export default page
