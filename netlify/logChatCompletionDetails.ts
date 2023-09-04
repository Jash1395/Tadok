import { ChatCompletion } from 'openai/resources/chat/completions'

// convert unix timestamp to hh:mm:ss format
const convertUnix = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000)
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

export const logChatCompletionDetails = (
    startTime: number,
    endTime: number,
    chatCompletion: ChatCompletion
) => {
    // convert miliseconds to seconds at 2 sig fig
    const seconds = parseFloat(((endTime - startTime) / 1000).toPrecision(2))
    const time = convertUnix(chatCompletion.created)

    console.log(`\n`)
    console.log(`[${time} ${chatCompletion.model} Generated in ${seconds}s]`)
    console.log(
        `[total: ${chatCompletion.usage?.total_tokens} | prompt: ${chatCompletion.usage?.prompt_tokens} | completion: ${chatCompletion.usage?.completion_tokens}]`
    )
    console.log(`\n`)
}
