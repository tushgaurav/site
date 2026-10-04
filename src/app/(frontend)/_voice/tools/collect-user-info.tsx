import { tool } from "@openai/agents/realtime"
import z from "zod"

export const collectUserInfoTool = tool({
    name: 'collect_user_info',
    description: 'Collect user information to answer questions about Tushar',
    parameters: z.object({ name: z.string(), context: z.string() }),
    async execute({ name, context }) {
       try {
        const response = await fetch('/api/realtime/tools/collect-user-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, context })
        })

        if (!response.ok) {
            throw new Error('Failed to send email')
        }

        return {
            success: true,
            message: 'User information collected and email sent'
        }
       } catch (error) {
        console.error('Error sending user info email:', error)
        return {
            success: false,
            message: 'Failed to process user information'
        }
       }
    }
})
