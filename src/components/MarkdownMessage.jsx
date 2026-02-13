import ReactMarkdown from 'react-markdown'

/**
 * Render bot message text as Markdown.
 * - Converts bullet char `•` → markdown `- ` for proper list rendering
 * - Handles `\n` line breaks
 * - Links open in new tab
 */
const MarkdownMessage = ({ text }) => {
    // Pre-process: normalize bullet points (• at start of line → markdown list)
    const processed = String(text || '')
        .replace(/^•\s*/gm, '- ')     // • item → - item
        .replace(/^\s*-\s+/gm, '- ')  // normalize indented dashes

    return (
        <div className="chat-markdown">
            <ReactMarkdown
                components={{
                    // Links open in new tab
                    a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                    // Paragraphs with proper spacing
                    p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                    ),
                    // Lists
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                    ),
                    // Bold
                    strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                    ),
                }}
            >
                {processed}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownMessage
