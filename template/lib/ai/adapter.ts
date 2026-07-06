import 'server-only'
import { constitution } from './constitution'

// ─── Contract ────────────────────────────────────────────────────

export type Message = {
    role: 'user' | 'assistant'
    content: string
}

export type AIAdapter = {
    chat: (options: {
        system: string
        messages: Message[]
        maxTokens?: number
    }) => Promise<string>
}

// ─── Constitution guard ───────────────────────────────────────────
// Wraps any adapter the user provides.
// Guarantees constitution is always prepended — no exceptions.

export function createAI(adapter: AIAdapter): AIAdapter {
    return {
        chat: ({ system, messages, maxTokens }) =>
            adapter.chat({
                system: `${constitution}\n\n${system}`,
                messages,
                maxTokens,
            }),
    }
}