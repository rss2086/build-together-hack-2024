"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Article from './Article'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleType } from './page'


interface Level {
  title: string
  description: string
  image: string
  active: boolean
}

const levels: Level[] = [
  {
    title: 'kid',
    description:
      'I know so little about this topic, explain this to me like I’m five.',
    image: '/levels/kid.png',
    active: false
  },
  {
    title: 'teen',
    description:
      'I know a little bit about this topic. Just the basic concepts.',
    image: '/levels/teen.png',
    active: false
  },
  {
    title: 'undergrad',
    description:
      'I have learned this topic during my studies. I should know most of it. Hopefully.',
    image: '/levels/undergrad.png',
    active: true
  },
  {
    title: 'grad',
    description:
      'This was something I have studied thoroughly for years. I got this!',
    image: '/levels/grad.png',
    active: false
  },
  {
    title: 'pro',
    description: 'I work in this area every single day. What’s new to learn?',
    image: '/levels/pro.png',
    active: false
  }
]

interface Generation {
  level: string
  text: string
}

export function FiveLevels({articles}: {articles: ArticleType[]}) {
  const [educationLevels, setEducationLevels] = useState(levels)


function setEducationLevel(level: string) {
  setEducationLevels(
    educationLevels.map(educationLevel => ({
      ...educationLevel,
      active: educationLevel.title === level
    }))
  )
}

function handleLevelClick(level: string) {
  setEducationLevel(level)
}

const currentLevelTitle =
  educationLevels.find(level => level.active)?.title ?? 'kid'
// console.log(currentLevelTitle, ' - currentLevelTitle')

const content = articles.filter(article => article.level === currentLevelTitle)[0].content


  return (
    <div className="flex ">
      <main className="flex-1 py-4">
        <header>
        <div className='max-w-4xl mx-auto pt-8'>
        <Link href="/" className=''>
        <h1 className='text-blue-600 dark:text-indigo-200'>Go back</h1>

        </Link>
        </div>
          <h1 className="pt-8 pb-4 text-5xl font-bold font-serif text-center">
            EI5L:
          </h1>
          <h2>
            <p className="text-center font-serif text-3xl font-bold italic">
              {articles[0].title}
            </p>
          </h2>
        </header>
        <Article text={content!} />
      </main>
      <aside className="w-1/4 p-4  border-l sticky h-full gap-12">
        {educationLevels.map(level => (
          <div
            key={level.title}
            onClick={() => setEducationLevel(level.title)}
            className={cn(
              'flex-1 p-4  border border-gray-200 dark:border-zinc-800 rounded-lg shadow-md my-4 cursor-pointer transition duration-300 ease-in-out hover:scale-105',
              level.active &&
                'border-2 border-blue-500 dark:border-blue-100 bg-indigo-100 dark:bg-indigo-950 cursor-auto hover:scale-100'
            )}
          >
            <div className="flex gap-4">
              <Image
                src={level.image}
                alt={level.title}
                className="size-24 mx-auto self-center place-self-center"
                width={120}
                height={120}
              />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold my-2">{level.title}</h2>
                <p>{level.description}</p>
              </div>
            </div>
          </div>
        ))}
      </aside>
      </div>
  )
}
