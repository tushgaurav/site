import { tool } from "@openai/agents/realtime"
import z from "zod"

export const internetSearchTool = tool({
    name: 'internet_search',
    description: 'Search the internet for information',
    parameters: z.object({ query: z.string() }),
    async execute({ query }) {
        const response = await fetch('/api/realtime/tools/search', {
            method: 'POST',
            body: JSON.stringify({ query, type: 'extract' }),
        })
        const data = await response.json()
        return JSON.stringify(data)
    }
})