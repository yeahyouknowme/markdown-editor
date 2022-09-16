import { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiExport, mdiDotsHorizontal } from '@mdi/js';
import ExportMenu from "./export-menu"

const AppHeader = ({ style, type }) => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);


  const toggleEditorOptions = () => {
    setOptionsMenuOpen(!optionsMenuOpen);
    setExportMenuOpen(false);
  }

  const toggleExportMenu = () => {
    setExportMenuOpen(!exportMenuOpen);
    setOptionsMenuOpen(false);
  }

  return (
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
            ? <ExportMenu
              /> 
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
  )
}

export default AppHeader;