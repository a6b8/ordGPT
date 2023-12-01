import { keyPathToValue, printMessages } from './helpers/mixed.mjs'
import { config } from './data/config.mjs'
import { presets as pre } from './data/presets.mjs'


export class OrdAPI {
    #config
    #presets


    constructor() {
        this.#config = config
        this.setPresets( { 'presets': pre } )
    }


    getPresets() {
        return this.#presets
    }


    setPresets( { presets } ) {
        const [ messages, comments ] = this.#validatePresets( { presets } ) 
        printMessages( { messages, comments } )

        this.#presets = Object
            .entries( presets['presets'] )
            .reduce( ( acc, a, index ) => {
                const [ key, value ] = a

                acc[ key ] = value
                acc[ key ]['input']['variables'] = Object
                    .entries( acc[ key ]['input']['variables'] )
                    .reduce( ( abb, b, rindex ) => {
                        const [ _key, _value ] = b
                        abb[ _key ] = _value

                        abb[ _key ]['validation'] = keyPathToValue( { 
                            'data': presets, 
                            'keyPath': abb[ _key ]['validation']
                        } )

                        return abb
                    }, {} )
                return acc
            }, {} )

        return this
    }


    #validatePresets( { presets } ) {
        const isObject = ( a ) => a && typeof a === 'object' && !Array.isArray( a )
        // const isRegex = ( a ) => a instanceof RegExp
    
        const validateStructure = ( obj, key, type ) => {
            if( !obj.hasOwnProperty( key ) ) { return false }
            if( typeof obj[ key ] !== type ) { return false }
            return true
        }
    
        let messages = []
        let comments = []
    
        if( !isObject( presets ) ) {
            messages.push( `Presets should be an object` )
        } else if( !validateStructure( presets, 'presets', 'object' ) ) {
            messages.push( `Key 'presets' is not type object` )
        } else if( !validateStructure( presets, 'validations', 'object' ) ) {
            messages.push( `Key 'regex' is not type object` )
        } else {
            [ messages, comments ] = Object
                .entries( presets['presets'] )
                .reduce( ( acc, a, index ) => {
                    const [ key, value ] = a 
                    const [ m, c ] = this.#validatePreset( { 
                        'presetValue': value, 
                        'presetKey': key 
                    } )

                    const tmp = [ m, c ]
                        .forEach( ( a, rindex ) => {
                            a.length > 0 ? acc[ rindex ].push( ...a ) : ''
                        } )
                    return acc
                }, [ messages, comments ]  )
        }
    
        return [ messages, comments ]
    }


    #validatePreset( { presetValue, presetKey } ) {
        const isObject = ( a ) => a && typeof a === 'object' && !Array.isArray( a )
        const isRegex = ( a ) => a instanceof RegExp
    
        const validateStructure = ( obj, key, type ) => {
            if( !obj.hasOwnProperty( key ) ) { return false }
            if( typeof obj[ key ] !== type ) { return false }
            return true
        }
    
        const messages = []
        const comments = []
    
        if( !isObject( presetValue ) ) {
            messages.push( `['${presetKey}'] should be type of object.` )
        } else if( !validateStructure( presetKey, 'description', 'string' ) ) {
            const tests = [
                [ 
                    !validateStructure( presetValue, 'description', 'string' ),
                    `['${presetKey}']['description'] should be type of string.`
                ],
                [
                    !validateStructure( presetValue, 'input', 'object' ),
                    `['${presetKey}']['input'] should be type of object.`
                ],
                [
                    !validateStructure( presetValue, 'output', 'object' ),
                    `['${presetKey}']['expect'] should be type of object.`
                ]
            ]
                .forEach( ( [ test, msg ] ) => test ? messages.push( msg ) : '' )
        }
    
        if( messages.length === 0 ) {
            const tests = [
                [
                    !validateStructure( presetValue['input'], 'query', 'object' ),
                    `['${presetKey}']['input']['query'] should be type of object.`
                ],
                [
                    !validateStructure( presetValue['input'], 'variables', 'object' ),
                    `['${presetKey}']['input']['variables'] should be type of object.`
                ]
            ]
                .forEach( ( [ test, msg ] ) => test ? messages.push( msg ) : '' )
        }
    
        if( messages.length === 0 ) {
            Object
                .entries( presetValue['input']['variables'] )
                .forEach( a => {
                    const [ key, variable ] = a
                    if( !isObject( variable ) ) {
                        messages.push( `['${presetKey}']['input']['variables']['${key}'] should be type of object.` )
                    } else {
                        const test = [
                            [
                                !validateStructure( variable, 'description', 'string' ),
                                `['${presetKey}']['input']['variables']['${key}']['description'] should be type of string.`
                            ],
                            [
                                !validateStructure( variable, 'required', 'boolean' ),
                                `['${presetKey}']['input']['variables']['${key}']['required'] should be type of boolean.`
                            ]
                        ]
                            .forEach( ( [ test, msg ] ) => test ? messages.push( msg ) : '' )
                    }
                }
            )
        }
        
        return [ messages, comments ]
    }


    getOpenAiSchema( { title, description, version, url } ) {
        const [ m, c ] = this.#validateOpenAISchema( { title, description, version, url } )
        printMessages( { 'messages': m, 'comments': c } )
    
        const struct = {
            'openapi': '3.1.0',
            'info': null,
            'servers': [],
            'paths': null,
            'comments': {
                'schemas': {}
            }
        }
        
        struct['info'] = [ 
            [ 'title', title ],
            [ 'description', description ],
            [ 'version', version ]
        ]
            .reduce( ( acc, a, index ) => {
                const [ key, value ] = a 
                acc[ key ] = value
                return acc
            }, {} )
        
        struct['servers']
            .push( { url } )
        
        struct['paths'] = Object
            .entries( this.#presets )
            .reduce( ( acc, a, index ) => {
                let [ operationId, preset ] = a
                const key = `${preset['input']['query']['struct']}`
                acc[ key ] = {
                    'get': {
                        'description': null,
                        'operationId': null,
                        'parameters': null,
                        'deprecated': false
                    }
                }
    
                let description = ''
                description += `${preset['description']} `
                console.log( 'p', preset['input']['variables'] )
                description += Object
                    .entries( preset['input']['variables'] )
                    .reduce( ( abb, b, rindex, all ) => {
                        abb += `"${b[ 0 ]}"`
                        abb += ':'
                        abb += `"${b[ 1 ]['default']['main']}"`

                        if( all.length - 1 === rindex ) {
                            abb = `In case required variables are missing, inform the user and use the following variable${all.length > 1 ? 's': ''}: {${abb}}`
                        } else {
                            abb += `,`
                        }

                        return abb
                    }, '' )

                acc[ key ]['get']['description'] = description
                acc[ key ]['get']['operationId'] = operationId
                acc[ key ]['get']['parameters'] = Object
                    .entries( preset['input']['variables'] )
                    .reduce( ( abb, a, index ) => { 
                        const [ k, v ] = a
                        /*
                        if( index === 0 ) {
                            abb.push( {
                                'name': 'network',
                                'in': 'path',
                                'required': true,
                                'description': 'The network identifier.',
                                'schema': {
                                    'type': 'string',
                                    'pattern': `^(${Object.keys( v['default'] ).join( '|' )})$`
                                }
                            } )
                        }
                        */

                        abb.push( {
                            'name': k,
                            'in': 'path',
                            'required': true,
                            'description': `${v['description']} ${v['validation']['description']}'`,
                            //'required': a['required'],
                            'schema': {
                                'type': 'string',
                                'pattern': v['validation']['regex'].source
                            }
                        } )
    
                        return abb
                    }, [] )
                return acc
            }, {} )
    
        return struct
    }


    #validateOpenAISchema( { title, description, version, url } ) {
        const messages = []
        const comments = []

        const tmp = [
            [ 'title', title ],
            [ 'description', description ],
            [ 'version', version ],
            [ 'url', url ]
        ]
            .forEach( a => {
                if( a[ 1 ] === undefined || a[ 1 ] === null ) {
                    messages.push( `Key '${a[ 0 ]}' is missing.` )
                } else if( typeof a[ 1 ] !== 'string' ) {
                    messages.push( `Key '${a[ 0 ]} is not type of 'string''`)
                }
            } )

        return [ messages, comments ]
    }
}