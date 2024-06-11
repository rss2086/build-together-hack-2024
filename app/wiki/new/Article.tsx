import Markdown from 'react-markdown'
// import MarkdownRenderer from './MarkdownRenderer'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
// import MarkdownRenderer from './MarkdownRenderer'

// Force the page to be dynamic and allow streaming responses up to 30 seconds

export default function Article({ text }: { text: string }) {
  return (
    <article className="py-12  rounded-lg w-full">
      <section className="max-w-5xl mx-auto">
        <div className="w-3/5 mx-auto">
          <Markdown
            className={'prose  dark:prose-invert'}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {text}
          </Markdown>
          {/* <Markdown className={'prose'}>{generation}</Markdown> */}
          {/* <MarkdownRenderer className={'prose'}>{generation}</MarkdownRenderer> */}
          {/* <MarkdownRenderer className={'prose'}>{generation}</MarkdownRenderer> */}
        </div>
      </section>
    </article>
  )
}
