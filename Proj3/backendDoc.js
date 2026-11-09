import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Devs & Games API',
        version: '1.0.0',
        description: 'API documentation for managing Devs and Games.'
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    paths: {
        '/devs/count': {
            get: {
                tags: ['Devs'],
                summary: 'Count Devs',
                responses: {
                    '200': {
                        description: 'Total number of devs',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer', example: 2 }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/devs/is-registered': {
            get: {
                tags: ['Devs'],
                summary: 'Check if Dev website is registered',
                parameters: [
                    {
                        name: 'website',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                        example: 'https://nintendo.com'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Registration status',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        registered: { type: 'boolean', example: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/devs': {
            get: {
                tags: ['Devs'],
                summary: 'Get all Devs ordered by name',
                responses: {
                    '200': {
                        description: 'A list of Devs ordered by name',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Dev' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Devs'],
                summary: 'Add a new Dev',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', example: 'Nintendo' },
                                    headquarters: { type: 'string', example: 'Kyoto, Japan' },
                                    website: { type: 'string', example: 'https://nintendo.com' }
                                },
                                required: ['name', 'headquarters', 'website']
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Dev created successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Dev' }
                            }
                        }
                    }
                }
            }
        },
        '/devs/{devId}': {
            get: {
                tags: ['Devs'],
                summary: 'Get a Dev by ID (includes their games)',
                parameters: [
                    {
                        name: 'devId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Dev details with games array',
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: [
                                        { $ref: '#/components/schemas/Dev' },
                                        {
                                            type: 'object',
                                            properties: {
                                                games: {
                                                    type: 'array',
                                                    items: { $ref: '#/components/schemas/Game' }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '404': { description: 'Dev not found' }
                }
            },
            put: {
                tags: ['Devs'],
                summary: 'Update an existing Dev',
                parameters: [
                    {
                        name: 'devId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Dev' }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Dev updated successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Dev' }
                            }
                        }
                    },
                    '404': { description: 'Dev not found' }
                }
            },
            delete: {
                tags: ['Devs'],
                summary: 'Delete a Dev',
                parameters: [
                    {
                        name: 'devId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Dev deleted successfully' },
                    '404': { description: 'Dev not found' }
                }
            }
        },
        '/games/count': {
            get: {
                tags: ['Games'],
                summary: 'Count Games',
                responses: {
                    '200': {
                        description: 'Total number of games',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        count: { type: 'integer', example: 2 }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/games/is-existing': {
            get: {
                tags: ['Games'],
                summary: 'Check if Game entryId exists',
                parameters: [
                    {
                        name: 'entryId',
                        in: 'query',
                        required: true,
                        schema: { type: 'string' },
                        example: 'G-001'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Existence check status',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        exists: { type: 'boolean', example: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/games': {
            get: {
                tags: ['Games'],
                summary: 'Get all Games ordered by title',
                responses: {
                    '200': {
                        description: 'A list of Games ordered by title',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Game' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Games'],
                summary: 'Add a new Game',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    entryId: { type: 'string', example: 'G-001' },
                                    title: { type: 'string', example: 'The Legend of Zelda' },
                                    genre: { type: 'string', example: 'Adventure' },
                                    devId: { type: 'string', example: '1' }
                                },
                                required: ['entryId', 'title', 'genre']
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Game created successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Game' }
                            }
                        }
                    }
                }
            }
        },
        '/games/{gameId}': {
            get: {
                tags: ['Games'],
                summary: 'Get a Game by ID (includes its devs)',
                parameters: [
                    {
                        name: 'gameId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Game details with associated dev',
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: [
                                        { $ref: '#/components/schemas/Game' },
                                        {
                                            type: 'object',
                                            properties: {
                                                dev: { $ref: '#/components/schemas/Dev' }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '404': { description: 'Game not found' }
                }
            },
            put: {
                tags: ['Games'],
                summary: 'Update an existing Game',
                parameters: [
                    {
                        name: 'gameId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Game' }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Game updated successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Game' }
                            }
                        }
                    },
                    '404': { description: 'Game not found' }
                }
            },
            delete: {
                tags: ['Games'],
                summary: 'Delete a Game',
                parameters: [
                    {
                        name: 'gameId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Game deleted successfully' },
                    '404': { description: 'Game not found' }
                }
            }
        }
    },
    components: {
        schemas: {
            Dev: {
                type: 'object',
                properties: {
                    devId: { type: 'string', example: '1' },
                    name: { type: 'string', example: 'Nintendo' },
                    headquarters: { type: 'string', example: 'Kyoto, Japan' },
                    website: { type: 'string', example: 'https://nintendo.com' }
                }
            },
            Game: {
                type: 'object',
                properties: {
                    gameId: { type: 'string', example: '101' },
                    entryId: { type: 'string', example: 'G-001' },
                    title: { type: 'string', example: 'The Legend of Zelda' },
                    genre: { type: 'string', example: 'Adventure' }
                }
            }
        }
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', (req, res) => res.json(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/api-docs`);
});