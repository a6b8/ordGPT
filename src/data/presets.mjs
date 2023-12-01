const presets = {
    'presets': {
        'getLatestBlockHash': {
            /* /r/blockhash: latest block hash. */
            'description': 'Retrieve the latest block hash from a given network.',
            'input': {
                'query': {
                    'struct': '/r/blockhash',
                },
                'variables': {}
            },
            'output': {}
        },
        'getLatestBlockHeight': {
            /* /r/blockhash: latest block height. */
            'description': 'Retrieve the latest block height from a given network.',
            'input': {
                'query': {
                    'struct': '/r/blockhash'
                },
                'variables': {}
            },
            'output': {}
        },
        'getLatestBlockTime': {
            /* /r/blocktime: UNIX time stamp of latest block. */
            'description': 'Retrieve the UNIX time stamp of latest block from a given network.',
            'input': {
                'query': {
                    'struct': '/r/blocktime'
                },
                'variables': {}
            },
            'output': {}
        },
        'getBlockHashFromBlockHeight': {
            /* /r/blockhash/<HEIGHT>: block hash at given block height. */
            'description': 'Retrieve the block at given block height and network.',
            'input': {
                'query': {
                    'struct': '/r/blockhash/{blockHeight}'
                },
                'variables': {
                    'blockHeight': {
                        'default': {
                            'main': '1',
                            'signet': '1'
                        },
                        'description': 'Set Block Height.',
                        'validation': 'validations__blockHeight',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getLatestChildrensFromInscription': {
            /* /r/children/<INSCRIPTION_ID>: the first 100 child inscription ids. */
            'description': 'Retrieve the first 100 child inscriptions ids from a given inscription id and network.',
            'input': {
                'query': {
                    'struct': '/r/children/{inscriptionId}'
                },
                'variables': {
                    'inscriptionId': {
                        'default': {
                            'main': 'fa9a67e27219837be1ec616470d7d1de0e822b245c233a5bf9699cd2abc01742i0',
                            'signet': null
                        },
                        'description': 'Set Inscription ID.',
                        'validation': 'validations__inscriptionId',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getChildrensFromInscriptionByPage': {
            /* /r/children/<INSCRIPTION_ID>/<PAGE>: the set of 100 child inscription ids on <PAGE>. */
            'description': 'Retrieve a set of 100 child inscription ids from a given inscription id, page offset and network',
            'input': {
                'query': {
                    'struct': '/r/children/{inscriptionId}/<{pageNumber}>'
                },
                'variables': {
                    'inscriptionId': {
                        'default': {
                            'main': 'fa9a67e27219837be1ec616470d7d1de0e822b245c233a5bf9699cd2abc01742i0',
                            'signet': null
                        },
                        'description': 'Set Inscription ID.',
                        'validation': 'validations__inscriptionId',
                        'required': true
                    },
                    'pageNumber': {
                        'default': {
                            'main': 0,
                            'signet': null
                        },
                        'description': 'Set Page Number of a result query.',
                        'validation': 'validations__pageNumber',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getMetadataFromInscription': {
            /* /r/metadata/<INSCRIPTION_ID>: JSON string containing the hex-encoded CBOR metadata. */
            'description': 'Retrieve JSON string containing the hex-encoded CBOR metadata from a given inscription id and network.',
            'input': {
                'query': {
                    'struct': '/r/metadata/{inscriptionId}'
                },
                'variables': {
                    'inscriptionId': {
                        'default': {
                            'main': 'fa9a67e27219837be1ec616470d7d1de0e822b245c233a5bf9699cd2abc01742i0',
                            'signet': null
                        },
                        'description': 'Set Inscription Id.',
                        'validation': 'validations__inscriptionId',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getLatestInscriptionsFromSatNumber': {
            /* /r/sat/<SAT_NUMBER>: the first 100 inscription ids on a sat. */
            'description': 'Retrieve the first 100 inscription ids on a sat from a given sat number and network.',
            'input': {
                'query': {
                    'struct': '/r/sat/{satNumber}'
                },
                'variables': {
                    'satNumber': {
                        'default': {
                            'main': '1942923750000000',
                            'signet': null
                        },
                        'description': 'Set Sat Number.',
                        'validation': 'validations__satNumber',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getInscriptionsFromSatNumberByPage': {
            /* /r/sat/<SAT_NUMBER>/<PAGE>: the set of 100 inscription ids on <PAGE>. */
            'description': 'Retrieve a set of 100 inscription ids from a given sat number and network.',
            'input': {
                'query': {
                    'struct': '/r/sat/{satNumber}/{pageNumber}'
                },
                'variables': {
                    'satNumber': {
                        'default': {
                            'main': '1942923750000000',
                            'signet': null
                        },
                        'description': 'Set Sat Number.',
                        'validation': 'validations__satNumber',
                        'required': true
                    },
                    'pageNumber': {
                        'default': {
                            'main': 0,
                            'signet': null
                        },
                        'description': 'Set Page Number of a result query.',
                        'validation': 'validations__pageNumber',
                        'required': true
                    }
                }
            },
            'output': {}
        },
        'getInscriptionFromSatNumberByIndex': {
            /* /r/sat/<SAT_NUMBER>/at/<INDEX>: the inscription id at <INDEX> of all inscriptions on a sat. <INDEX> may be a negative number to index from the back. 0 being the first and -1 being  */
            'description': 'Retrieve a inscriptionId from a given sat number, index of inscription and network. For example -1 would be the latest inscription id.',
            'input': {
                'query': {
                    'struct': '/r/sat/{satNumber}/at/{arrayIndex}'
                },
                'variables': {
                    'satNumber': {
                        'default': {
                            'main': 1942923750000000,
                            'signet': null
                        },
                        'description': 'Set Sat Number.',
                        'validation': 'validations__satNumber',
                        'required': true
                    },
                    'arrayIndex': {
                        'default': {
                            'main': -1,
                            'signet': null
                        },
                        'description': 'Set array array index.',
                        'validation': 'validations__arrayIndex',
                        'required': true
                    }
                }
            },
            'output': {}
        }
    },
    'validations':{
        'blockHeight': {
            'regex': /^[1-9]\d*$/,
            'description': 'Allowed is only a positive number.'
        },
        'inscriptionId': {
            'regex': /^[0-9a-f]{64}i\d$/,
            'description': 'Allowed are only IDs following this format: exactly 64 hexadecimal characters followed by a lowercase "i" and a digit.',
        },
        'pageNumber': {
            'regex': /^[1-9]\d*$/,
            'description': 'Allowed is only a positive number.'
        },
        'satNumber': {
            'regex': /^[1-9]\d*$/,
            'description': 'Allowed is only a positive number.'
        },
        'arrayIndex': {
            'regex': /^-?\d+$/,
            'description': 'Allowed is only a positive or negative number.'
        }
    }
}

export { presets }


