import { nanoid } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import Globe from '@/components/magicui/globe'
import Link from 'next/link'
import { WikiSearchBar } from '@/components/SearchBar'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'EiL5: Explained in five levels',
  description: 'Any topic explained in five levels of complexity',
}

export default async function IndexPage() {
  const id = nanoid()

  return (
<main className="w-full">
  <header className="flex flex-row-reverse w-full justify-between p-4">
    <ThemeToggle />
    {/* <Chat id={id} session={session} missingKeys={missingKeys} /> */}
  </header>
  <h1 className="text-5xl text-center font-serif px-4 sm:px-0">
      EiFL: Explained in five levels
  </h1>
  <section className='flex flex-col sm:px-0 p-8 gap-4'>

    {/* <div className="mt-12 bg-green-400"> */}
    <Globe className="mt-36" />
    <div className="sm:absolute top-[81%] left-[20%] w-full" >
      <WikiSearchBar />
    </div>
    <Link
      className="sm:absolute top-[20%] left-[26%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">English</h1>
      <h2 className="text-sm">6,002,312+ articles</h2>
    </Link>
    <Link
      className="sm:absolute top-[36%] left-[21%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Spanish</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[51%] left-[21%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">French</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[66%] left-[26%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Japanese</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[20%] right-[26%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Mandarin</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[36%] right-[21%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Hindi</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[51%] right-[21%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Gujarati</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>
    <Link
      className="sm:absolute top-[66%] right-[26%] hover:bg-gray-200 dark:hover:bg-zinc-800 px-4 py-2 cursor-auto"
      href="/"
    >
      <h1 className="text-xl text-[#36C] font-bold">Portuguese</h1>
      <h2 className="text-sm">Coming Soon</h2>
    </Link>

  </section>
</main>

    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} session={session} missingKeys={missingKeys} />
    // </AI>
  )
}
