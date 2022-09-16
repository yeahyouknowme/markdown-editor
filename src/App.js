import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { marked } from 'marked';
import { Icon } from '@mdi/react';
import { mdiChevronUpCircle, mdiChevronDownCircle, mdiMenu, mdiExport, mdiDotsHorizontal, mdiLanguageMarkdown, mdiFilePdfBox, mdiLan } from '@mdi/js';
import { useAtom } from 'jotai';

import './App.css';
import ExportMenu from './components/export-menu';
import AppHeader from './components/app-header';
import { CMThemeAtom, cleanMarkupAtom, ThemeAtom } from './store';

marked.setOptions({
  breaks: true
})

const defaultText = "Write here"

const App = () =>{
  const [cleanMarkup, setCleanMarkup] = useAtom(cleanMarkupAtom);
  const [screenSize, setScreenSize] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const [CMTheme, setCMTheme] = useAtom(CMThemeAtom);
  const [theme, setTheme] = useAtom(ThemeAtom);

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

  const toggleMenu = (e) => {
    e.preventDefault();
    console.log("toggle menu");
  }
  return (
    <div className="app-body">
      <div className={ showPreview ? "editor-panel-hidden" : "editor-panel" }>
        <AppHeader />
        <CodeMirror
          value={ defaultText }
          theme={ CMTheme }
          extensions={ [vim(), markdown()] }
          width="100%"
          onChange={ onChange }
          id="editor"
        />
      </div>
      <div className={ showPreview ? "preview-panel" : "preview-panel-hidden" }>
          <AppHeader
            style={{

            }}
          />
          <div id="preview" dangerouslySetInnerHTML={{__html: cleanMarkup}} />
      </div>
      { screenSize > 600 
        ? null 
        : <div
            className="preview-toggle"
            style={{
              color: theme.toolbar.borderColor,
            }}
          >
            <Icon
              path={ showPreview ? mdiChevronDownCircle : mdiChevronUpCircle }
              size={ 1.2 }
              onClick={ togglePreview }
            />
          </div>
      }
    </div>
  );
}

export default App;
