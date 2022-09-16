import { useState } from 'react';
import { useAtom } from 'jotai';
import { Icon } from '@mdi/react';
import { mdiLanguageMarkdown, mdiFilePdfBox } from '@mdi/js';

import { ThemeAtom } from '../store';

const ExportMenu = () => {
  const [exportFormat, setExportFormat] = useState('md');

  const [theme, setTheme] = useAtom(ThemeAtom);

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
    <div
      className="export-menu"
      style={{
        borderColor: theme.menu.borderColor,
        backgroundColor: theme.menu.backgroundColor,
      }}
    >
      <div
        className="export-menu-item"
        style={{
          borderColor: theme.menu.borderColor,
        }}
      >
        <div 
          className="format-button"
          onClick={ formatMarkdown }
          style={{
            backgroundColor: 
              exportFormat === 'md' 
                ? theme.menu.activeToggleColor
                : theme.menu.backgroundColor,
            color: 
              exportFormat === 'md'
                ? theme.menu.textColor
                : theme.menu.iconColor,
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
            backgroundColor: 
              exportFormat === 'pdf' 
                ? theme.menu.activeToggleColor
                : theme.menu.backgroundColor,
            color:
              exportFormat === 'pdf'
                ? theme.menu.textColor
                : theme.menu.iconColor,
            }}
        >
          <Icon
            path={ mdiFilePdfBox }
            size={ 1.4 }
          />
          pdf 
        </div>
      </div>
      <div
        className="export-menu-item"
        style={{
          borderColor: theme.menu.borderColor,
        }}
      >
          <button 
            className="download-button"
            onClick={ downloadFile }
            style={{
              backgroundColor: theme.menu.buttonColor,
              color: theme.menu.buttonTextColor,
            }}
          >
            { "Download ." + exportFormat }
          </button>
      </div>
    </div>
  )
}

export default ExportMenu;