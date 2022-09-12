import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { marked } from 'marked';
import { Icon } from '@mdi/react'
import { mdiChevronUpCircle, mdiChevronDownCircle } from '@mdi/js';
import { useAtom } from 'jotai';

import './App.css';
import { CMThemeAtom } from './store';

marked.setOptions({
  breaks: true
})

const defaultText = "Write here"
const defaultHTML = marked(defaultText)

const App = () =>{
  const [cleanMarkup, setCleanMarkup] = useState(DOMPurify.sanitize(defaultHTML));
  const [screenSize, setScreenSize] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const [CMTheme, setCMTheme] = useAtom(CMThemeAtom);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth > 600) {
        setShowPreview(true);
      }
    } 
    window.addEventListener("resize", handleResize);
  }, [])

  const updateMarkup = (value) => {
    setCleanMarkup(DOMPurify.sanitize(marked(value)));
  }

  const onChange = React.useCallback((value, viewUpdate) => {
    updateMarkup(value);
  }, []);

  const togglePreview = (e) => {
    e.preventDefault();
    setShowPreview(!showPreview);
  }

  return (
    <div className="app-body">
        <div className={ showPreview ? "editor-panel-hidden" : "editor-panel"}>
          <CodeMirror
            value={defaultText}
            theme={CMTheme}
            extensions={[vim(), markdown()]}
            width="100%"
            onChange={onChange}
            id="editor"
          />
        </div>
        <div className={ showPreview ? "preview-panel" : "preview-panel-hidden" }>
            <div id="preview" dangerouslySetInnerHTML={{__html: cleanMarkup}} />
        </div>
        { screenSize > 600 
          ? null 
          : <div className={ showPreview ? "close-preview" : "open-preview" }>
              <Icon 
                path={ showPreview ? mdiChevronDownCircle : mdiChevronUpCircle}
                size={2}
                onClick={togglePreview}
              />
            </div>
        }
    </div>
  );
}

export default App;
