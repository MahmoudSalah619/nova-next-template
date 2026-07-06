import 'server-only'
import { createAI } from './adapter'
import type { AIAdapter } from './adapter'

// ─── Register your provider here ─────────────────────────────────
// Implement the chat function with your provider of choice.
// Everything else (constitution, guards) is handled automatically.
//
// Examples:
//   Vercel AI SDK → generateText({ model: openai('gpt-4o'), ... })
//   Anthropic SDK → anthropic.messages.create(...)
//   OpenAI SDK    → openai.chat.completions.create(...)

const adapter: AIAdapter = {
    chat: async ({ system, messages, maxTokens }) => {
        throw new Error(
            '[lib/ai] No provider configured. Implement the chat function in lib/ai/index.ts'
        )
    },
}

export const ai = createAI(adapter)