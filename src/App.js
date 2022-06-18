import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import './App.css';

marked.setOptions({
  breaks: true
})

const defaultText = "Write here"
const defaultHTML = marked(defaultText)

function App() {
  const [cleanMarkup, setCleanMarkup] = React.useState(DOMPurify.sanitize(defaultHTML))

  const updateMarkup = (e) => {
    setCleanMarkup(DOMPurify.sanitize(marked(e.target.value)));
  }
  return (
    <div className="container default-font">
      <div className="row">
        <div className="editor-panel col">
          <textarea 
            defaultValue={defaultText}
            onChange={updateMarkup}
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
