import * as lancedb from 'vectordb'
import {
  Schema,
  Field,
  Float32,
  FixedSizeList,
  Int32,
  Int16,
  Utf8,
  Int8,
  Float16
} from 'apache-arrow'

const apiKey = process.env.OPENAI_API_KEY!

export const ldb = await lancedb.connect({
  uri: 'db://explain-in-five-levels-tq2veo',
  region: 'us-east-1'
})

// const data = [
//   { id: 1, text: 'Cherry', type: 'fruit' },
//   { id: 2, text: 'Carrot', type: 'vegetable' },
//   { id: 3, text: 'Potato', type: 'vegetable' },
//   { id: 4, text: 'Apple', type: 'fruit' },
//   { id: 5, text: 'Banana', type: 'fruit' }
// ]
// const schema = new Schema([
//   new Field("id", new Utf8()),
//   new Field("query", new Utf8()),
//   new Field("topic_id", new Utf8()),
//   new Field("lang", new Utf8()),
// ]);

const data = [
  { id: 'test', query: 'test', topic_id: '1', lang: 'en', content: 'Lots and lots of content'},
]

export const ldbEmbedding = new lancedb.OpenAIEmbeddingFunction('query', apiKey)
const table = await ldb.createTable('topics', data, ldbEmbedding)
// const table = await ldb.createTable({name:'topics_new',schema:schema})

//
//
// const table = await ldb.openTable('food_table')
const queryEmbedding = await ldbEmbedding.embed([
  'a sweet fruit like an Apple to eat'
])
// Query the table
//
// const results = await table
//   .search(queryEmbedding[0])
//   .metricType(lancedb.MetricType.Cosine)
//   .limit(2)
//   .execute()
//   .then(res => res.map(r => console.log(r.text)))

// console.log(results)
