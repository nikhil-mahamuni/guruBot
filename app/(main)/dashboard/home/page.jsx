'use client'
import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { logout } from '@/services/user-auth-services'
function page() {

  const {globalUserData} = useAuthContext()
  function clicked(){
    console.log(globalUserData.uid);
    
  }
  return (
    <div>
      Home Page
      <Button onClick={() => logout(globalUserData.uid)}>logout</Button>
      <Button onClick={clicked}>Uid</Button>
    </div>
  )
}

export default page
