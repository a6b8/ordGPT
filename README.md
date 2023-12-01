[![CircleCI](https://img.shields.io/circleci/build/github/a6b8/repos2doc/main)](https://circleci.com/gh/a6b8/repos2doc)


# Ord GPT

```
█▀█ █▀█ █▀▄   █▀▀ █▀█ ▀█▀
█▄█ █▀▄ █▄▀   █▄█ █▀▀ ░█░
```

This repository documents all the necessary data required to connect the Ordinals API with OpenAI, enabling the AI to autonomously perform queries and discover answers to questions.

> Designed for Open AI Custom GPT


## Table of Contents

- [Ord GPT](#ord-gpt)
  - [Table of Contents](#table-of-contents)
  - [OpenAI Schema](#openai-schema)
  - [Docs](#docs)

## OpenAI Schema

```javascript
import { OrdAPI } from './../src/OrdAPI.mjs'

const ordinalApi = new OrdAPI()
const schema = ordinalApi.getOpenAiSchema( {
    'title' : '',
    'description': '',
    'version': '',
    'url': ''
} )

console.log( 'schema:', schema )

```

The result you can find here: [./result/openAI/schema.json](./result/openAI/schema.json)


## Docs

```js
import { Repos2Doc } from 'repos2doc'
const repos2doc = new Repos2Doc()
import { findTextFilesAndCreateNewDocument } from './../src/helpers/splitDocuments.mjs'

const config = repos2doc.getConfig()
config['files']['test'] = [
    {
        'type': 'allow',
        'search': 'endsWith',
        'strings': [
            '.txt', '.md', 'html'
        ]
    }
]

repos2doc.getDocument( {
    'repositories': [ 'ordinals/ord/gh-pages' ],
    'name': 'ord',
    'destinationFolder': './result/docs/',
    'formats': [ 'pdf', 'txt', 'md' ],
    'options': [ 
        {
            'description': 'this is a test!',
            'filter': 'test'
        }
    ]
} )
```

The result you can find here: [./result/documents/](./result/documents/)

