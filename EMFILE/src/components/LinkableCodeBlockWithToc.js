import React from "react";
import { render } from "react-dom";

import LinkableCodeBlock from "@site/src/components/LinkableCodeBlock"

import styled from "styled-components";

export const TocContainer = styled.span`
  display: flex;
`;

export const StickyNav = styled.nav`
  width: 220px;
  min-width: 220px;
  padding: 16px;
  margin: 8px;
  align-self: flex-start;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 48px;
  max-height: calc(100vh - 70px);
  overflow: auto;
`;

class TableOfContents extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  headings: props.headings
    };
  }

  componentDidMount() {
	  window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
	 var lines = document.querySelectorAll('.token-line');
	 var tocItems = document.querySelectorAll('.table-of-contents__link');
	 var tocItemToSelect =  tocItems[0];
	 for (const line of lines) {
		var tocItemOfCurrentLine = Array.from(tocItems).find(e => e.getAttribute("href") === '#'+line.id);
		tocItemToSelect = tocItemOfCurrentLine ? tocItemOfCurrentLine : tocItemToSelect;
		var position = line.getBoundingClientRect();
		if (position.bottom >= window.innerHeight || (position.top >= 0 && tocItemOfCurrentLine)) {
		    for (const activeToc of tocItems) {
		    	activeToc.classList.remove("table-of-contents__link--active");
		    }
		    tocItemToSelect.classList.add("table-of-contents__link--active");
		    break;
		}
	 }
  }

  render() {
     return (
       <StickyNav aria-label="Table of contents">
        <ul class="table-of-contents table-of-contents__left-border">
          {this.state.headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`} class="table-of-contents__link toc-highlight" onClick={(e) => {e.preventDefault();document.querySelector(`#${heading.id}`).scrollIntoView({behavior: "smooth"});}}>
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
       </StickyNav>
     );
  }
}

class LinkableCodeBlockWithToc extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  blockId: props.blockId,
      code: props.code,
      language: props.language,
	  lineStart: props.lineStart,
	  headings: props.headings
    };
  }
  
  render() {
    return (
	  <TocContainer>
        <LinkableCodeBlock blockId={this.state.blockId} language={this.state.language} code={this.state.code} lineStart={this.state.lineStart} />
	    <TableOfContents headings={this.state.headings}/>
	  </TocContainer>
    );
  }
}

export default LinkableCodeBlockWithToc;