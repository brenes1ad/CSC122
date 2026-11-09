import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = 3000;

app.use(cors());

const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Date API',
        version: '1.0.0',
        description: 'Returns the current server date in several formats.'
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    paths: {
        '/date': {
            get: {
                summary: 'Get the current date',
                responses: {
                    200: {
                        description: 'Current date',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        iso: { type: 'string', format: 'date-time', example: '2026-11-06T14:30:00.000Z' },
                                        day: { type: 'integer', example: 6 },
                                        month: { type: 'integer', example: 11 },
                                        year: { type: 'integer', example: 2026 },
                                        readable: { type: 'string', example: 'Fri Nov 06 2026' }
                                    }
                                }
                            }
                        }
                    }
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