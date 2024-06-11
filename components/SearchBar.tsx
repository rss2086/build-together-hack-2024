"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

export function WikiSearchBar() {
  const [search, setSearch] = useState('')
  const router = useRouter()


  function handleSearch(query: string) {
    router.push('/wiki?search=' + search)
  }




  return (
    <>
    <h1 className="py-2 font-bold text-2xl font-serif">
    Search for any topic
  </h1>
  <div className="flex">
    <Input
      className="w-full max-w-4xl py-6"
      placeholder="Search for a language"
      onChange={(e) => setSearch(e.target.value)}
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch(search)
      }
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch(search)
        }
      }
      }
    />
    <button className="p-2 px-8 bg-black text-white ml-4 rounded-lg" onClick={()=>handleSearch(search)}>
      Search
    </button>
  </div>
  </>
  )
}