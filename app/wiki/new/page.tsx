
import { createClient } from '@/app/db/supabase/server'
import { FiveLevels } from './FiveLevels'
export const dynamic = 'force-dynamic'



export default async function HomePage({ params, searchParams }: { params: { slug: string }, searchParams: Record<string, string> }) {

  console.log('Page', params, searchParams)
  const topic = searchParams?.topic


  return (
    <>
    <FiveLevels/>
    </>
  )
}

