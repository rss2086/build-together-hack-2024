'use server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'
import { createOpenAI } from '@ai-sdk/openai'
import { nanoid } from 'nanoid'
import { ldb } from '../db/lancedb'
import { qdrantClient } from '../db/qdrant'
import { generateEmbedding } from '../db/embeddings'
import { createClient } from '../db/supabase/server'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})
const groqModel = groq('llama3-8b-8192')
const openAIModel = openai('gpt-4o')
const modelToUse = groqModel

export const supabase = createClient();

export async function generateKid(input: string) {
  'use server'

  const stream = createStreamableValue('')

  ;(async () => {
    let full = ''
    const { textStream } = await streamText({
      model: modelToUse,
      prompt: `
      Your background: You are a brilliant communicator with the ability to explain complex ideas in simple terms. In particular, you are known for your ability to explain complex ideas to children. You are asked to explain the following concept to a child: ${input}
      Assume zero prior knowledge and take care to explain any new science or specialized terms that you introduce.

      The child you are explaining this to is 8 years old and has a basic understanding of the world, but will not understand any technical concepts. Imagine the child has a limited vocabulary. Your goal is to explain the concept in a way that is easy for the child to understand.
      Do not use complex words and maintain a friendly and positive tone throughout your response. Leverage great use of analogies and examples to help the child understand the concept.

      Use your creativity and imagination to make the explanation as engaging and fun as possible. Remember, the child you are explaining this to is 8 years old and has a basic understanding of the world.

      Your answer should be easy to understand, engaging, and fun for the child to read. The child should be able to understand the concept after reading your explanation. Your response MUST be formatted in Markdown, and should use Markdown syntax to make the explanation as understandable as possible.

      Assume you are talking directly to this person and that they have just asked you to explain ${input} to them.
      Your response MUST be formatted in Markdown as this result will be displayed as a blog post, you should use Markdown syntax to make the explanation as understandable as possible.
      Limit your response to 500 words.`
    })

    for await (const delta of textStream) {
      stream.update(delta)
      full += delta
    }

    stream.done()
    

        
   
  })()

  return { output: stream.value }
}

export async function generateTeen(input: string) {
  'use server'

  const stream = createStreamableValue('');
  
  (async () => {
    let full = ''
    const { textStream } = await streamText({
      model: modelToUse,
      prompt: `
      Your background: You are an engaging and dynamic communicator with a talent for making complex ideas interesting and accessible to teenagers. You are asked to explain the following concept to a teenager: ${input}.

      Assume that the teenager has a general understanding of science and basic concepts but may not be familiar with specialized terms or deeper theoretical details. Your goal is to explain the concept in a way that captures their interest and curiosity, using relatable examples and analogies that resonate with their everyday experiences.
      They are 13 years and may have heard about the ${input} before.
      Use a conversational and slightly informal tone to make the explanation more engaging. Incorporate real-world applications, interesting facts, and thought-provoking questions to stimulate their curiosity and encourage further exploration.

      Assume you are talking directly to this person and that they have just asked you to explain ${input} to them.
      Your response should be informative, engaging, and thought-provoking, making the concept clear and interesting for a teenager. Use Markdown syntax to organize the explanation, including headers, bullet points, and emphasis where appropriate to enhance readability.
      Your response MUST be formatted in Markdown as this result will be displayed as a blog post, you should use Markdown syntax to make the explanation as understandable as possible.
      Limit your response to 500 words.`
    })

    for await (const delta of textStream) {
      stream.update(delta)
      full += delta
    }

    stream.done()
    console.log(full)
  })()

  return { output: stream.value }
}

export async function generateUndergrad(input: string) {
  'use server'

  const stream = createStreamableValue('')

  ;(async () => {
    let full = ''
    const { textStream } = await streamText({
      model: modelToUse,
      prompt: `
      Your background: You are a knowledgeable and articulate communicator with the ability to explain complex ideas in a clear and concise manner. You are asked to explain the following concept to an undergraduate student: ${input}.
      Assume that the student has a basic understanding of the subject but may not be familiar with advanced theories or technical jargon. Your goal is to provide a comprehensive and structured explanation that builds on their existing knowledge, using clear definitions, examples, and analogies to illustrate key points.

      Use a formal yet approachable tone, and organize the information logically to facilitate understanding. Incorporate relevant theories, studies, and real-world applications to enrich the explanation and make it more engaging.

      Your response should be detailed, informative, and structured, making the concept clear and accessible to an undergraduate student. Use Markdown syntax to organize the explanation, including headers, bullet points, and emphasis where appropriate to enhance readability.

      Assume you are talking directly to this person and that they have just asked you to explain ${input} to them.
      Your response MUST be formatted in Markdown as this result will be displayed as a blog post, you should use Markdown syntax to make the explanation as understandable as possible.
      Limit your response to 500 words.

`
    })

    for await (const delta of textStream) {
      stream.update(delta)
      full += delta
    }

    stream.done()
    console.log(full)
  })()

  return { output: stream.value }
}

export async function generateGrad(input: string) {
  'use server'

  const stream = createStreamableValue('')

  ;(async () => {
    let full = ''
    const { textStream } = await streamText({
      model: modelToUse,
      prompt: `
      Your background: You are an expert in the field of ${input} and an excellent communicator with the ability to explain complex ideas in a detailed and nuanced manner. You are asked to explain the following concept to a graduate student specializing in this field: ${input}.

      Assume that the student has a strong foundational knowledge of the subject and is familiar with advanced theories and technical terminology. Your goal is to provide a deep, thorough explanation that not only reinforces their existing knowledge but also introduces new insights, current research, and advanced applications of the concept.

      Use a formal and academic tone, and structure the information in a logical, comprehensive manner. Incorporate detailed explanations, relevant studies, cutting-edge research, and theoretical discussions to provide a rich and engaging learning experience.

      Your response should be in-depth, informative, and intellectually stimulating, making the concept clear and insightful for a graduate student. Use Markdown syntax to organize the explanation, including headers, bullet points, and emphasis where appropriate to enhance readability.

      Assume you are talking directly to this person and that they have just asked you to explain ${input} to them.
      Your response MUST be formatted in Markdown as this result will be displayed as a blog post, you should use Markdown syntax to make the explanation as understandable as possible.
      Limit your response to 500 words.`
    })

    for await (const delta of textStream) {
      stream.update(delta)
      full += delta
    }

    stream.done()
    console.log(full)
  })()

  return { output: stream.value }
}

export async function generatePro(input: string) {
  'use server'

  const stream = createStreamableValue('')

  ;(async () => {
    let full = ''
    const { textStream } = await streamText({
      model: modelToUse,
      prompt: `
      Your background: You are a world reknowned expert on ${input} and a brilliant communicator the likes of Richard Feynman. with the ability to explain complex ideas in simple terms while teaching concepts at the highest level of depth and mastery.
      You are talking to another expert in the field of ${input} who is looking to understand the concept at a deeper level and more thoroughly.
      Assume you are talking directly to this expert and that they have just asked you to explain ${input} to them.
      Your goal is to explain the concept in a way that is helpful for the expert to understand, while also providing a deep and thorough explanation of the concept. You should use technical terms and assume that the expert you are explaining this to has a deep understanding of the field of ${input}.

      Your response MUST be formatted in Markdown as this result will be displayed as a blog post, you should use Markdown syntax to make the explanation as understandable as possible.

      Limit your response to 500 words.`
    })

    for await (const delta of textStream) {
      stream.update(delta)
      full += delta
    }

    stream.done()
    console.log(full)
  })()

  return { output: stream.value }
}

export async function addVectorEmbedding(query: string, supaId:number) {
  const id = nanoid()
  const queryVector = await generateEmbedding(query)

  const operationInfo = await qdrantClient.upsert("topics", {
    wait: true,
    points: [
      { id: id, vector: queryVector.data[0].embedding, payload: { query: query, supaId:supaId  } },
    ],
  });

}

export async function addTopic(topic:string){
  const { data, error } = await supabase
  .from('pages')
  .insert([
  { "topic": topic},
  ])
}

export async function addPage(topic:string){
  const { data, error } = await supabase
  .from('pages')
  .insert([
  { "topic": topic},
  ])
}