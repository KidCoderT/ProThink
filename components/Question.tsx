"use client"
import React from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter }
  from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Separator } from './ui/separator';
interface Props {
  markdown: string
}
const Question: React.FC<Props> = ({ markdown }) => {
  return (
    <Markdown
      children={markdown}
      className={"overflow-y-scroll p-12"}
      components={{
        h1: ({ node, ...props }) => <h1 className="mt-4  text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />,
        h2: ({ node, ...props }) => <h2 className=" border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props
        } />,
        h3: ({ node, ...props }) => <h3 className=" text-2xl font-semibold tracking-tight" {...props} />,
        h4: ({ node, ...props }) => <h4 className=" text-xl font-semibold tracking-tight" {...props} />,
        p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
        a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside" {...props} />,
        li: ({ node, ...props }) => <li className="ml-4" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
        hr: ({ node, ...props }) => <Separator />,
        code: ({ children, className, ...rest }) => {
          const match = /language-(\w+)/.exec(className || '')
          if (!String(children).includes("\n")) {
            return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...rest}>{children}</code>;
          }
          return <SyntaxHighlighter
            style={materialDark}
            language={className ?? ""}
            PreTag="div"
            customStyle={{ marginBottom: "20px", width: "100%" }}
          >
            {String(children)}
          </SyntaxHighlighter>
        },
      }}
    />
  )
}
export default Question