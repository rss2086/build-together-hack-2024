import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { ThemeToggle } from '@/components/theme-toggle'
import Globe from '@/components/magicui/globe'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { WikiSearchBar } from '@/components/SearchBar'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
<main className="w-full">
  <header className="flex flex-row-reverse w-full justify-between p-4">
    <ThemeToggle />
    {/* <Chat id={id} session={session} missingKeys={missingKeys} /> */}
  </header>
  <section>
    <h1 className="text-5xl text-center font-serif">
      Explained in five levels
    </h1>
    {/* <div className="mt-12 bg-green-400"> */}
    <Globe className="mt-36" />
    <Link
      className="absolute top-1/4 left-[27%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">English</h1>
      <h2 className="text-sm">6,002,312+ articles</h2>
    </Link>
    <Link
      className="absolute top-[40%] left-[22%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Spanish</h1>
      <h2 className="text-sm">1,321,512+ articles</h2>
    </Link>
    <Link
      className="absolute top-[55%] left-[22%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">French</h1>
      <h2 className="text-sm">2,101,312+ articles</h2>
    </Link>
    <Link
      className="absolute top-[70%] left-[27%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Japanese</h1>
      <h2 className="text-sm">1,287,412+ articles</h2>
    </Link>
    <Link
      className="absolute top-1/4 right-[27%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Mandarin</h1>
      <h2 className="text-sm">1,912,312+ articles</h2>
    </Link>
    <Link
      className="absolute top-[40%] right-[22%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Hindi</h1>
      <h2 className="text-sm">1,101,712+ articles</h2>
    </Link>
    <Link
      className="absolute top-[55%] right-[22%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Gujarati</h1>
      <h2 className="text-sm">1,018,312+ articles</h2>
    </Link>
    <Link
      className="absolute top-[70%] right-[27%] hover:bg-gray-200 px-4 py-2"
      href="/test"
    >
      <h1 className="text-xl text-[#36C] font-bold">Portuguese</h1>
      <h2 className="text-sm">1,523,912+ articles</h2>
    </Link>
    <div className="absolute top-[85%] left-[20%] w-full" >
      <WikiSearchBar />
    </div>
  </section>
</main>

    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} session={session} missingKeys={missingKeys} />
    // </AI>
  )
}
