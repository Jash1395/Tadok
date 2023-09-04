export const schema = {
    type: 'object',
    properties: {
        sentences: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    korean: {
                        type: 'string',
                        description: 'The Korean text.',
                    },
                    english: {
                        type: 'string',
                        description: 'The English translation.',
                    },
                },
                required: ['korean', 'english'],
            },
        },
    },
    required: ['sentences'],
}
