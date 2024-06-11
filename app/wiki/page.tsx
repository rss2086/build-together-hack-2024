import Link from "next/link";
import { qdrantClient } from "../db/qdrant";
import { generateEmbedding } from "../db/embeddings";
import { QdrantClient } from "@qdrant/js-client-rest";
import { redirect } from "next/navigation";
import { generateObject, generateText } from "ai"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { createOpenAI } from '@ai-sdk/openai';
import { openai } from '@ai-sdk/openai';
import { z } from "zod";
import Heirarchy from "./heirarchy";


export default async function Page({params, searchParams}: {params: {slug: string}, searchParams: Record<string, string>}) {

  console.log('Page', params, searchParams)
  const search = searchParams?.search

  if(!search) {
    return (
      <div className="h-screen grid place-items-center">
        <div>
        <h1 className="text-2xl ">No search params</h1>
        <Link href="/">
                <h1 className="text-2xl ">
                  Go home
                  </h1>
                  </Link>
                  </div>
      </div>
    )
  }

  const vectorClient = new QdrantClient({
    url: 'https://8cd1818f-f419-4861-89fd-1dd08253c0a2.us-east4-0.gcp.cloud.qdrant.io:6333',
    apiKey: 'gymi8BGbOnZzzEhWcRv2itKsC6KY7UJzjVvCxKhV3TcTqhuI3nmUPg',
  });
  
  const res = await vectorClient.search("topics", {
    vector: await generateEmbedding(search ?? ''),
    limit: 50,
  });

  // console.log(res)

  const bestScore = res[0]?.score
  const bestSlug = res[0]?.payload?.slug

  if(bestScore <= 0.80 || res.length === 0) {
    redirect('/wiki/new?topic=' + search)
  }

  if(bestScore >= 0.92) {
    redirect('/wiki/' + bestSlug)
  }

const topics = res.map((result) => result?.payload?.slug as string)

async function organizeTopics(topics: string[]) {
  "use server"
  const { object: levels } = await generateObject({
    model: openai('gpt-4o'),
    system: 'Your are a heirarchical topic organizer. Your goal is to organize a provided list of topics in a heirarchy based on how semantically similar they are. For example, Math -> Algebra -> Linear Algebra -> Matrices. ',
    prompt: 'Organize all the following topics into a heirarchy: ' + topics.toString() + " Your answer must be valid JSON and be returned in the json format, all links should be returned back with an empty array for subtopics if there are no subtopics.",
    schema: z.object({
      data: z.array(
        z.object({
          descriptive: z.string({description: 'A descriptive top-level category, that accurately describes the topics and subtopics below.'}),
          topics: z.array(z.object({
            topic: z.string({description: 'A topic title that represents the slug'}),
            slug: z.string({description: 'The topic slug, directly sourced from the provided list of topic slugs'}),
            subtopics: z.array(z.object({
              topic: z.string(),
              slug:z.string(),
            }, {
              description: 'A subtopic that is a child of the parent topic, this can be empty if there are no subtopics in the provided list.'
            }))
          }))
        }),
      ),
    }),
  });

  return levels
}


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-8 py-4">
        <h1 className="text-3xl font-bold text-center">No great matches found</h1>
        <p className="text-gray-700 dark:text-gray-400 text-center sm:hidden">Add to our EI5L Wiki with the button below or categorize and read existing pages.</p>
        <Link href={`/wiki/new?topic=${search}`}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6 sm:p-4 rounded w-full">
            Create a new page
          </Button>
        </Link>
        </div>
        <p className="text-gray-700 dark:text-gray-400 hidden sm:block">Add to our EI5L Wiki with the button above or read existing pages.</p>
      </div>
      <Heirarchy topics={topics} organizeFunc={organizeTopics}/>
    </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}