import fs from 'fs'
import { OrdAPI } from './../src/OrdAPI.mjs'


const ordinalApi = new OrdAPI()
const schema = ordinalApi.getOpenAiSchema( {
    'title' : 'Ordinal API',
    'description': 'This API allows you to get data from bitcoin mainnet ordinals protocol. To retrieve inscription ids, metadata and sat numbers.',
    'version': '0.12.1',
    'url': 'https://ordinals.com'
} )

fs.writeFileSync( 
    './result/openAI/schema.json', 
    JSON.stringify( schema, null, 4 ), 
    'utf-8'
)

