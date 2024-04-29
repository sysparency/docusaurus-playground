import React from "react";
import { themes, Prism, Highlight } from "prism-react-renderer";
import styled from "styled-components";
import BrowserOnly from "@docusaurus/BrowserOnly";


(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-java");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-cobol");
require("prismjs/components/prism-pascal");
require("prismjs/components/prism-plsql");
require("prismjs/components/prism-abap");

export const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: auto;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

export const Line = styled.div`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;

class LinkableCodeBlock extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  blockId: props.blockId,
      code: props.code,
      language: props.language,
	  lineStart: props.lineStart
    };
  }

    componentDidMount() {
        // using timeout to make sure the element is rendered and scrollIntoView works
        setTimeout(() => {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element && id.startsWith('line')) {
                element.style.backgroundColor = 'rgba(66,66,66,1)';
                //element.scrollIntoView({ behavior: 'auto', block: 'center' });
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const middle = absoluteElementTop - (window.innerHeight / 2);
                window.scrollTo(0, middle);
            }
        }, 0);

    }
  
  render() {
    return (
      <Highlight theme={themes.palenight} code={this.state.code} language={this.state.language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
           <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} id={this.state.blockId + (i + this.state.lineStart)}  {...getLineProps({ line, key: i })}>
                <LineNo>{i + this.state.lineStart}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>
    );
  }
}

const BrowserOnlyWrapper = (props) => {
  return (
      <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
              return <LinkableCodeBlock {...props}/> 
          }}
      </BrowserOnly>
  );
};

export default BrowserOnlyWrapper;