import 'server-only'

type PromptOptions = {
    feature: string
    role: string
    scope: string[]
    outOfScope: string[]
    context?: string
    format?: string
}

export function buildPrompt(options: PromptOptions): string {
    const { feature, role, scope, outOfScope, context, format } = options

    return [
        `## FEATURE: ${feature.toUpperCase()}`,
        `You are acting as: ${role}`,
        `## IN SCOPE\n${scope.map(s => `- ${s}`).join('\n')}`,
        `## OUT OF SCOPE\n${outOfScope.map(s => `- ${s}`).join('\n')}`,
        context && `## CONTEXT\n${context}`,
        format && `## RESPONSE FORMAT\n${format}`,
    ]
        .filter(Boolean)
        .join('\n\n')
}