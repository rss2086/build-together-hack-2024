import OpenAI from "openai";




export async function generateEmbedding(text: string) {
  // console.log('\n\n\ HERE n\n\n',process.env.OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}

);
  return await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
    encoding_format: "float",
  }).then((response) => response.data[0].embedding);
}