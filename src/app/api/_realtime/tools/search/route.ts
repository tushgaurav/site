import OpenAI from 'openai';
import Firecrawl from '@mendable/firecrawl-js';

export async function POST(request: Request) {
    const { query, type } = await request.json()

    const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

    const results = await firecrawl.search(query, {
        limit: 2,
        location: 'India',
        scrapeOptions: { formats: ['markdown'] }
    });

    let response: any = results;

    if (type === 'extract') {

        const groq = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: 'https://api.groq.com/openai/v1'
        });

        const ai_response = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',
            messages: [{
                role: 'user', content: `Based on the following search results, please parse and analyze the information to answer this query: "${query}"

                    Search results:
                    ${JSON.stringify(results, null, 2)}

                    Please provide a clear and comprehensive answer to the query based on the information found in the search results. Do not use any other formatting, just the answer.` }],
        });

        response = ai_response.choices[0].message.content;
    }

    return Response.json(response)
}