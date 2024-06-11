
import { createClient } from '@/app/db/supabase/server'
import { FiveLevels } from './FiveLevels'
export const dynamic = 'force-dynamic'


function createSlug(input: string): string {
  return input
      .toLowerCase()                           // Convert to lowercase
      .trim()                                  // Trim whitespace from both ends
      .replace(/[^\w\s-]/g, '')                // Remove all non-word characters (letters, numbers, underscores) except for spaces and hyphens
      .replace(/[\s_-]+/g, '-')                // Replace spaces, underscores, and hyphens with a single hyphen
      .replace(/^-+|-+$/g, '');                // Remove leading and trailing hyphens
}

export default async function HomePage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const supabase = createClient()

  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('slug', slug)
    .single()

  const { data: data2, error: error2 } = await supabase
  .from('pages')
  .select('*')
  .eq('topic_id', data.id)

  const title = data?.topic
  const convertedTitleCase = title?.replace(/-/g, ' ').replace(/\b\w/g, (l:string) => l.toUpperCase())
  // console.log('SUPABASE',data2)

  const articles = data2.map((article) => {
    return {
      title: convertedTitleCase,
      topic:slug,
      level: article.level,
      content: article.content,
      image: `/levels/${article.level}.png`,
      active: false
    }
  })

  return (
    <>
    <FiveLevels articles={articles}/>
    </>
  )
}

