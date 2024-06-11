
import { createClient } from '@/app/db/supabase/server'
import { FiveLevels } from './FiveLevels'
export const dynamic = 'force-dynamic'



export default async function HomePage({ params, searchParams }: { params: { slug: string }, searchParams: Record<string, string> }) {

  const topic = searchParams?.topic


  return (
    <>
    <FiveLevels/>
    </>
  )
}

