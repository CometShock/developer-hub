import Highlight, { defaultProps } from 'prism-react-renderer'
import { Fragment } from 'react'
import CopyToClipboardButton from './products/CopyToClipboard'

export function Fence({ children, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className + ' scrollbar relative '} style={style}>
          <CopyToClipboardButton text={children} />
          <code className="block w-[calc(100%-25px)] overflow-auto ">
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                {'\n'}
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
