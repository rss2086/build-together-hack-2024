
import { createClient } from '@/app/db/supabase/server'
import { FiveLevels } from './FiveLevels'
export const dynamic = 'force-dynamic'



export interface ArticleType {
  title: string
  topic: string
  level: string
  content: string
  image: string
  active: boolean
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



  const articles = data2?.map((article) => {
    return {
      title: convertedTitleCase,
      topic:slug,
      level: article.level,
      content: article.content,
      image: `/levels/${article.level}.png`,
      active: false
    }
  })

  if(!articles) {
    return (
      <div>
        <h1>Sorry, no articles found for this topic.</h1>
      </div>
    )
  }
  
  return (
    <>
    <FiveLevels articles={articles}/>
    </>
  )
}

