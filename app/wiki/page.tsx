import Link from "next/link";
import { qdrantClient } from "../db/qdrant";
import { generateEmbedding } from "../db/embeddings";
import { QdrantClient } from "@qdrant/js-client-rest";
import { redirect } from "next/navigation";
import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

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

  const bestScore = res[0].score
  const bestSlug = res[0].payload?.slug

  if(bestScore >= 0.96) {
    redirect('/wiki/' + bestSlug)
  }

  if(bestScore <= 0.80) {
    redirect('/wiki/new?topic=' + search)
  }



  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex gap-8">
        <h1 className="text-3xl font-bold">No great matches found</h1>
        <Link href={`/wiki/new?topic=${search}`}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create a new page
          </Button>
        </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400">This page will soon be dynamic and self-organizing to heirachically show knowledge areas</p>
      </div>
      <div className="space-y-4">
        {res.map((result) => (

                  <Collapsible key={result.id}>
                            <Link href={`/wiki/${result?.payload?.slug}`} >
                  <div>
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-md shadow-sm dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                      <div className="font-medium"><h1 className="text-xl">{result?.payload?.topic as string}</h1></div>
                      {/* <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 py-3 bg-gray-50 rounded-b-md dark:bg-gray-800 dark:text-gray-300">
                      <p>
                        The internet is a global network of interconnected computer networks that use the Internet Protocol
                        Suite (TCP/IP) to communicate. It is a network of networks that consists of private, public, academic,
                        business, and government networks of local to global scope, linked by a broad array of electronic,
                        wireless, and optical networking technologies.
                      </p>
                    </CollapsibleContent>
                  </div>
                  </Link>
                </Collapsible>

        ))}


      </div>
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