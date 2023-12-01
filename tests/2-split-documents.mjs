import { findTextFilesAndCreateNewDocument } from './../src/helpers/splitDocuments.mjs'


const folderPath = './repos2doc-temp/'
const newDocumentPath = './repos2doc-temp/splitter/'
const chunkSize = 1 * 1024 * 1024

findTextFilesAndCreateNewDocument( { folderPath, newDocumentPath, chunkSize } )
