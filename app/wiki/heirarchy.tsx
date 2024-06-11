"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { set } from "date-fns"
import Link from "next/link"
import { useState } from "react"


type Results = {
  data: {
      topics: {
          slug: string;
          topic: string;
          subtopics: {
              slug: string;
              topic: string;
          }[];
      }[];
      descriptive: string;
  }[];
}
export default function Heirarchy({topics, organizeFunc}: {topics: string[], organizeFunc: (topics: string[]) => Promise<Results>}){

  const [showHierarchy, setHierarchy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [levels,setLevels] = useState<Results>()

  async function handleHierarchyClick() {
    setLoading(true)

    const organized = await organizeFunc(topics)
    setHierarchy(!showHierarchy)
    setLevels(organized)
    setLoading(false)
  }

  if(!showHierarchy) {
    return (
      <div className="flex flex-col gap-4">
      <div className="flex gap-20 align-middle items-end">
      <h1 className="text-2xl">Topics</h1>
      <Button onClick={() => handleHierarchyClick()} disabled={loading}>Categorize!</Button>
      </div>
      <div>
        {loading ? 
<div  className="grid place-items-center h-96 w-full" role="status">
    <svg aria-hidden="true" className="size-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
 : (
                  topics.map((topic) => (
                    <Link key={topic} href={`/wiki/${topic}`} >
                      <div className="text-blue-500 hover:text-blue-700">{topic}</div>
                    </Link>
                  ))
        )
      }
      </div>
      </div>
    )
  }

  if(levels) {

  return (
    <div className="space-y-4">
    {levels.data.map((level) => (
      <Collapsible key={level.descriptive}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
          <div className="font-medium">{level.descriptive}</div>
          <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-3 bg-gray-50 rounded-b-md dark:bg-gray-800 dark:text-gray-300">
        {level.topics.map((topic) => (
          <div key={topic.slug}>
          <Link href={`/wiki/${topic.slug}`} >
            <div className="text-blue-500 hover:text-blue-700">{topic.topic}</div>
          </Link>
          {
            topic.subtopics.map((subtopic) => (
              <Link key={subtopic.slug} href={`/wiki/${subtopic.slug}`} >
                <div className="text-blue-500 hover:text-blue-700 ml-4">{subtopic.topic}</div>
              </Link>
            ))
          }
          </div>
        ))}
        </CollapsibleContent>
      </Collapsible>
    ))}
  </div>
  )
}
}