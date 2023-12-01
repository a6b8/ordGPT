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

/*
const folderPath = './result/docs/'
const newDocumentPath = './result/docs/splittet/'
const chunkSize = 3 * 1024 * 1024

findTextFilesAndCreateNewDocument( folderPath, newDocumentPath, chunkSize )
*/