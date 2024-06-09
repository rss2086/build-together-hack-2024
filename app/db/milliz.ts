import { DataType, MilvusClient } from '@zilliz/milvus2-sdk-node'
import { config } from './config'

const { uri, username, password } = config

console.info(`Connecting to DB: ${uri}`)
const client = new MilvusClient({
  address: uri,
  username: username,
  password: password
})
// console.log('Connected to Milvus: ' + client.connectStatus)

// console.log(process.env.MILVUS_URL, process.env.MILVUS_TOKEN)
//
const schema = [
  {
    name: `topic_id`,
    description: `primary id`,
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: true
  },
  {
    name: `topic`,
    description: `word count`,
    data_type: DataType.Int64
  },
  {
    name: `content`,
    description: `content`,
    data_type: DataType.VarChar,
    max_length: 8096,
  },
  {
    name: `content_embedding`,
    description: `content_embedding`,
    data_type: DataType.FloatVector
  }
]

// create colleciton
const collectionManager = await client.createCollection({
  collection_name: 'topics',
  schema: schema,
  dimension: 768,
})


// console.log('Connected to Milvus: ' + client.connectStatus)
// console.log('Connection status: ' + milvusClient.connectStatus)
