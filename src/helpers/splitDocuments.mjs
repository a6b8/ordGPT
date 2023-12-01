import fs from 'fs'
import path from 'path'


function findTextFilesAndCreateNewDocument( { folderPath, newDocumentPath, chunkSize } ) {
    fs.readdir( folderPath, (err, files) => {
        if( err ) {
            console.error( 'Error reading folder:', err )
            return
        }


        const textFiles = files
            .filter( file => {
                const filePath = path.join( folderPath, file )
                const stats = fs.statSync( filePath )
                return stats.isFile() && file.endsWith( '.md' )
            } )

        
        const combinedText = textFiles
            .map( file => {
                const filePath = path.join( folderPath, file )
                const fileContents = fs.readFileSync( filePath, 'utf-8' )
                return fileContents
            } )
            .join( '\n' )

        const chunks = []
        for( let i = 0; i < combinedText.length; i += chunkSize ) {
            chunks.push( combinedText.slice( i, i + chunkSize ) )
        }

        chunks
            .forEach((chunk, index) => {
                const chunkFileName = `${newDocumentPath}_${index + 1}.txt`
                fs.writeFileSync( chunkFileName, chunk, 'utf-8' )
                console.log(`Chunk ${index + 1} created: ${chunkFileName}`)
            } )
    } )
}

export { findTextFilesAndCreateNewDocument }
