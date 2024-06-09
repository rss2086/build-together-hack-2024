
import { createClient } from '@/app/db/supabase/server'
import { FiveLevels } from './FiveLevels'
export const dynamic = 'force-dynamic'



export default async function HomePage({ params }: { params: { slug: string } }) {
  const topic = params.slug
  const supabase = createClient()


  return (
    <>
    <FiveLevels/>
    </>
  )
}

