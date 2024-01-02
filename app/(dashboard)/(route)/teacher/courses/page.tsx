import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CoursesPage = () => {
  return (
    <section className="p-6">
      <Link href="/teacher/create">
        <Button>
          New Course
        </Button>
      </Link>
    </section>
  )
}

export default CoursesPage