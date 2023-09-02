type role = 'function' | 'system' | 'user' | 'assistant'

interface ChatCompletionMessage {
    role: role
    content: string
}
