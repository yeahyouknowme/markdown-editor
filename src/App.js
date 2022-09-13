import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { vim } from '@replit/codemirror-vim';
import { marked } from 'marked';
import { Icon } from '@mdi/react'
import { mdiChevronUpCircle, mdiChevronDownCircle, mdiMenu, mdiExport, mdiDotsHorizontal, mdiLanguageMarkdown, mdiFilePdfBox, mdiLan } from '@mdi/js';
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
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

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

  const toggleMenu = (e) => {
    e.preventDefault();
    console.log("toggle menu");
  }

  const toggleEditorOptions = () => {
    setOptionsMenuOpen(!optionsMenuOpen);
    setExportMenuOpen(false);
  }

  const toggleExportMenu = () => {
    setExportMenuOpen(!exportMenuOpen);
    setOptionsMenuOpen(false);
  }

  const downloadMarkdown = () => {
    console.log("download markdown");
  }
  const downloadPDF = () => {
    console.log("download pdf");
  }

  return (
    <div className="app-body">
      <div className={ showPreview ? "editor-panel-hidden" : "editor-panel" }>
        <div className="editor-header">
          <div className="editor-title">
            markrr
          </div>
          <div className="editor-button-group">
            <div className="export-button">
              <Icon
                path={ mdiExport }
                size={ 1.1 }
                onClick={ toggleExportMenu }
              />
              { exportMenuOpen
                ? <div className="export-menu">
                    <div className="download-button">
                      <Icon
                        path={ mdiLanguageMarkdown }
                        size={ 1.2 }
                        onClick={ downloadMarkdown }
                      />
                      md 
                    </div>
                    <div className="download-button">
                      <Icon
                        path={ mdiFilePdfBox }
                        size={ 1.2 }
                        onClick={ downloadPDF }
                      />
                      pdf 
                    </div>
                    <div className="container-arrow-tr"></div>
                  </div>
                : null
              }
            </div>
            <div className="editor-options-button">
              <Icon
                path={ mdiDotsHorizontal }
                size={ 1.4 }
                onClick= { toggleEditorOptions }
              />
              { optionsMenuOpen 
                ? <div className="editor-options-menu">
                    
                  </div>
                : null
              } 
            </div>
          </div>
        </div>
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
          <div className="preview-header">
            <Icon 
              path={ mdiMenu }
              size={ 1 }
              onClick={ toggleMenu }
            />
          </div>
          <div id="preview" dangerouslySetInnerHTML={{__html: cleanMarkup}} />
      </div>
      { screenSize > 600 
        ? null 
        : <div className={ showPreview ? "close-preview" : "open-preview" }>
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
