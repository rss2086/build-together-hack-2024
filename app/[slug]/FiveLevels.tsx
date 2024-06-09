"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  generateKid,
  generatePro,
  generateGrad,
  generateTeen,
  generateUndergrad
} from './actions'
import { StreamableValue, readStreamableValue } from 'ai/rsc'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Article from './Article'
import Image from 'next/image'

interface Level {
  title: string
  description: string
  image: string
  active: boolean
}

const levels: Level[] = [
  {
    title: 'Kid',
    description:
      'I know so little about this topic, explain this to me like I’m five.',
    image: '/levels/kid.png',
    active: false
  },
  {
    title: 'Teen',
    description:
      'I know a little bit about this topic. Just the basic concepts.',
    image: '/levels/teen.png',
    active: false
  },
  {
    title: 'Undergrad',
    description:
      'I have learned this topic during my studies. I should know most of it. Hopefully.',
    image: '/levels/undergrad.png',
    active: true
  },
  {
    title: 'Grad',
    description:
      'This was something I have studied thoroughly for years. I got this!',
    image: '/levels/grad.png',
    active: false
  },
  {
    title: 'Professional',
    description: 'I work in this area every single day. What’s new to learn?',
    image: '/levels/pro.png',
    active: false
  }
]

interface Generation {
  level: string
  text: string
}

export function FiveLevels({topic}: {topic: string}) {

const [educationLevels, setEducationLevels] = useState<Level[]>(levels)
const [generationKid, setGenerationKid] = useState<string>('')
const [generationTeen, setGenerationTeen] = useState<string>('')
const [generationUndergrad, setGenerationUndergrad] = useState<string>('')
const [generationGrad, setGenerationGrad] = useState<string>('')
const [generationPro, setGenerationPro] = useState<string>('')

const [isLoaded, setLoading] = useState<boolean>(false)

const runGenerateFunction = async (
  topic: string,
  generatorFunc: (
    input: string
  ) => Promise<{ output: StreamableValue<string, any> }>,
  setFunc: Dispatch<SetStateAction<string>>
) => {
  const { output } = await generatorFunc(topic) // Make sure to await the correct property if using destructuring

  for await (const delta of readStreamableValue(output)) {
    setFunc(currentGeneration => `${currentGeneration}${delta}`)
  }
}

useEffect(() => {
  setLoading(true)
}, [])

useEffect(() => {
  if (isLoaded) {
    Promise.any([
      runGenerateFunction(
        'Why is slavery bad?',
        generateKid,
        setGenerationKid
      ),
      runGenerateFunction(
        'Why is slavery bad?',
        generateTeen,
        setGenerationTeen
      ),
      runGenerateFunction(
        'Why is slavery bad?',
        generateUndergrad,
        setGenerationUndergrad
      ),
      runGenerateFunction(
        'Why is slavery bad?',
        generateGrad,
        setGenerationGrad
      ),
      runGenerateFunction(
        'Why is slavery bad?',
        generatePro,
        setGenerationPro
      )
    ]).then(() => {
      console.log('All generation functions have completed.')
      // You can set another state here if you need to know when all have finished
    })
  }
}, [isLoaded]) // Ensuring runGenerateTopic is a dependency

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
  educationLevels.find(level => level.active)?.title ?? 'Kid'
console.log(currentLevelTitle, ' - currentLevelTitle')

function showCurrentLevelText() {
  switch (currentLevelTitle) {
    case 'Kid':
      return generationKid
    case 'Teen':
      return generationTeen
    case 'Undergrad':
      return generationUndergrad
    case 'Grad':
      return generationGrad
    case 'Professional':
      return generationPro
    default:
      return ''
  }
}


  return (
    <div className="flex bg-white dark:bg-black">
      <main className="flex-1 py-4">
        <header>
          <h1 className="pt-8 pb-4 text-5xl font-bold font-serif text-center">
            EI5L:
          </h1>
          <h2>
            <p className="text-center font-serif text-3xl font-bold italic">
              {topic}
            </p>
          </h2>
        </header>
        <Article text={showCurrentLevelText()} />
      </main>
      <aside className="w-1/4 p-4 bg-white border-l sticky h-full gap-12">
        {educationLevels.map(level => (
          <div
            key={level.title}
            onClick={() => setEducationLevel(level.title)}
            className={cn(
              'flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-md my-4 cursor-pointer transition duration-300 ease-in-out hover:scale-105',
              level.active &&
                'border-2 border-blue-500 bg-indigo-100 cursor-auto hover:scale-100'
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
