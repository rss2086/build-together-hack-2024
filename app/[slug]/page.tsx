'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Article from './Article'
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
import { FiveLevels } from './FiveLevels'

export const dynamic = 'force-dynamic'


function HomePage({ params }: { params: { topic: string } }) {
  const topic = params.topic

  return (
    <>
    <FiveLevels  topic={topic}/>
    </>
  )
}

export default HomePage
