import { createContentLoader } from 'vitepress'
import { componentDocSummaries } from './component-docs'

function stripToText(src: string): string {
  return src
    .replace(/^---[\s\S]*?---/, '')              // frontmatter
    .replace(/<script[\s\S]*?<\/script>/gi, '')  // script blocks
    .replace(/<style[\s\S]*?<\/style>/gi, '')    // style blocks
    .replace(/<[^>]+>/g, ' ')                    // HTML / Vue tags
    .replace(/```[\s\S]*?```/g, ' ')             // fenced code blocks
    .replace(/`[^`]+`/g, ' ')                    // inline code
    .replace(/#{1,6}\s+/g, ' ')                  // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')           // bold
    .replace(/\*([^*]+)\*/g, '$1')               // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')     // links
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')        // images
    .replace(/^\s*[-*+]\s/gm, ' ')               // unordered list markers
    .replace(/^\s*\d+\.\s/gm, ' ')               // ordered list markers
    .replace(/\s+/g, ' ')
    .trim()
}

export interface ContentPage {
  url: string
  description: string
  text: string
}

export default createContentLoader('**/*.md', {
  transform(rawData): ContentPage[] {
    return rawData
      .filter(p => p.url !== '/')
      .map(page => {
        const stripped = stripToText(page.src || '')

        // Enrich component pages with their summary + any prose from component-docs
        const componentKey = page.url.startsWith('/components/')
          ? page.url.replace('/components/', '').replace(/\/$/, '')
          : null
        const componentSummary = componentKey ? (componentDocSummaries[componentKey] || '') : ''

        const text = [componentSummary, stripped]
          .filter(Boolean)
          .join(' ')
          .slice(0, 4000) // cap so the client bundle stays lean

        return {
          url: page.url,
          description: (page.frontmatter?.description as string) || '',
          text,
        }
      })
  },
})
