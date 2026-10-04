export async function POST(request: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not set')
        }

        const response = await fetch(
            "https://api.openai.com/v1/realtime/client_secrets",
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: {
                        type: "realtime",
                        model: "gpt-realtime",
                    }
                }),
            }
        )

        if (!response.ok) {
            throw new Error('Failed to get client secrets')
        }

        const data = await response.json()

        return Response.json(
            {
                success: true,
                value: data.value
            }
        )
    } catch (error) {
        return Response.json(
            { error: "Failed to get client secrets" },
            { status: 500 }
        )
    }
}