import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv()


export async function deepResearch(userID: number, question: string, history:any[]) {
    try {
        const userHistory: any[] = []
        userHistory.push({ role: "user", content: question })

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
            {
                model: "alibaba/tongyi-deepresearch-30b-a3b:free",
                messages: [
                    ...history
                ],
                max_tokens: 2500,
                temperature: 0.7,
   
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.key}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'Research App'
                }
            }
        )

        const message = response.data.choices[0].message;
        return message

    } catch (error) {
        console.log(error);

    }
}