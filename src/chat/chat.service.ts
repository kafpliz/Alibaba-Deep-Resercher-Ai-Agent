import { Injectable } from '@nestjs/common';
import { deepResearch } from 'src/shared/external/deepResercherClient';
import { HistoryService } from 'src/shared/entity/history/history.service';

@Injectable()
export class ChatService {

    constructor(private histService: HistoryService) { }

    async sendRequest(query: string, userID: number) {
        console.log('---ОБРАБАТЫВАЮ---');
        const history = (await this.histService.getUserHustory(userID)).reverse()
        const messages: any[] = [
            {
                role: "system",
                content: `Ты - русскоязычный AI-ассистент для глубоких исследований. 

★ СТРОГИЕ ПРАВИЛА ФОРМАТИРОВАНИЯ:

1. ЯЗЫК: Всегда отвечай на русском языке
2. СОДЕРЖАНИЕ: Всегда предоставляй развернутый содержательный ответ
3. КОНТЕКСТ: Учитывай предыдущие сообщения

4. ФОРМАТИРОВАНИЕ - ТОЛЬКО HTML (ЗАПРЕЩЕН Markdown):
   - <h3>Заголовки</h3>
   - <p>Абзацы текста</p>
   - <ul><li>Элементы списка</li></ul>
   - <strong>Жирный текст</strong>
   - <em>Курсив</em>
   - <code>Код</code> и <pre>Блоки кода</pre>
   - <blockquote>Цитаты</blockquote>
   - <table>Таблицы</table>

5. МАТЕМАТИЧЕСКИЕ ФОРМУЛЫ - ЗАПРЕЩЕНО:
    НЕ используй: $...$ или $$...$$
    НЕ используй: \`\`\`math ... \`\`\`
    НЕ используй: LaTeX команды (\\frac, \\sqrt, \\sum)
    НЕ используй: Обратные слеши \\

6. МАТЕМАТИЧЕСКИЕ ФОРМУЛЫ - РАЗРЕШЕНО:
    Используй обычный текст с Unicode символами:
   - Степени: c² = a² + b²
   - Дроби: 1/2, (a+b)/c
   - Греческие буквы: α, β, γ, π, θ
   - Символы: √, ∑, ∫, ∞, ≠, ≈, ≤, ≥

★ ЕСЛИ НЕ МОЖЕШЬ ОТВЕТИТЬ:
Объясни причину и предложи альтернативу.

        ВАЖНО: Все формулы должны быть сразу читаемы в HTML без дополнительной обработки!`
            },

        ]


        for (const item of history) {
            messages.push({ role: 'user', content: item.question })
            messages.push({ role: 'assistant', content: item.answer })
        }

        messages.push({ role: "user", content: query })



        const question = await deepResearch(userID, query, messages)
        console.log(question);

        await this.histService.addUserHistory(userID, query, question.content)

        const responce = {
            answer: question.content
        }
        return responce

    }

    async chatHistory(userID: number) {
        const hist = await this.histService.getUserHustory(userID)
        hist.reverse()

        return hist
    }
}
