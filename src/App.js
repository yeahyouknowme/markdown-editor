import React from 'react';
import DOMPurify from 'dompurify';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { marked } from 'marked';
import './App.css';

marked.setOptions({
  breaks: true
})

const defaultText = "Write here"
const defaultHTML = marked(defaultText)

function App() {
  const [cleanMarkup, setCleanMarkup] = React.useState(DOMPurify.sanitize(defaultHTML))

  const updateMarkup = (value) => {
    setCleanMarkup(DOMPurify.sanitize(marked(value)));
  }

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value', value);
    updateMarkup(value);
  }, []);

  return (
    <div className="container default-font">
      <div className="row">
        <div className="editor-panel col">
          <CodeMirror
            value={defaultText}
            extensions={[markdown()]}
            width="100%"
            onChange={onChange}
            id="editor"
          />
        </div>
        <div className="preview-panel">
          <div id="preview" dangerouslySetInnerHTML={{__html: cleanMarkup}} />
        </div>
      </div>
    </div>
  );
}

export default App;
