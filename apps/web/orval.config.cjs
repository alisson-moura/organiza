module.exports = {
    organiza: {
        output: {
            mode: 'tags-split',
            client: 'react-query',
            target: 'src/api/endpoints',
            schemas: 'src/api/model',
            baseUrl: "http://localhost:3001"
        },
        input: {
            target: './api.json'
        }
    }
}