import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function AddBlogButton() {
  return (
    <Button asChild>
      <Link href={'/user/addblog'}>Add Blog</Link>
    </Button>
  )
}
