import ReactMarkdown from 'react-markdown'
import MathJax from 'react-mathjax'
import remarkGfm from 'remark-gfm'
import RemarkMathPlugin from 'remark-math'

export default function MarkdownRenderer(props) {
  const newProps = {
    ...props,
    remarkPlugins: [remarkGfm, RemarkMathPlugin],
    componentst: {
      ...props.renderers,
      math: props => <MathJax.Node formula={props.value} />,
      inlineMath: props => <MathJax.Node inline formula={props.value} />
    }
  }
  return (
    <MathJax.Provider input="tex">
      <ReactMarkdown {...newProps} />
    </MathJax.Provider>
  )
}
