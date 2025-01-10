import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      Explore Page
      <Link href='/content-generator'>
      <Button>Content Generator</Button>
      </Link>

      <Link href='/guru-text-bot'>
      <Button>Quick Chat Bot</Button>
      </Link>
    </div>
  )
}

export default page
