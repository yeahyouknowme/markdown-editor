import { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiLanguageMarkdown, mdiFilePdfBox } from '@mdi/js';

const ExportMenu = () => {
  const [exportFormat, setExportFormat] = useState('');

  const formatMarkdown = () => {
    setExportFormat('md');
  }
  const formatPDF = () => {
    setExportFormat('pdf');
  }

  const downloadFile = (e) => {
    e.preventDefault();
    if(exportFormat !== '') {
      console.log("download file " + exportFormat);
    }
  }
  
  return(
    <div className="export-menu">
      <div className="export-menu-item">
        <div 
            className="format-button"
          onClick={ formatMarkdown }
          style={{
            backgroundColor: exportFormat === 'md' ? '#333347' : '#242533',
            color: "#9898d4"
          }}
        >
          <Icon
            path={ mdiLanguageMarkdown }
            size={ 1.5 }
          />
          md 
        </div>
        <div
          className="format-button"
          onClick={ formatPDF }
          style={{
            backgroundColor: exportFormat === 'pdf' ? '#333347' : '#242533',
            color: "#9898d4"
          }}
        >
          <Icon
            path={ mdiFilePdfBox }
            size={ 1.4 }
          />
          pdf 
        </div>
      </div>
      <div className="export-menu-item">
          <button 
            className="download-button"
            onClick={ downloadFile }
            style={{
              backgroundColor: exportFormat === '' ? '#333347' : '#6A6A94',
              color: exportFormat === '' ? '#6A6A94' : "#242533",
            }}
          >
            { "Download ." + exportFormat }
          </button>
      </div>
    </div>
  )
}

export default ExportMenu;