import { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiExport, mdiDotsHorizontal } from '@mdi/js';
import { useAtom } from 'jotai';
import ExportMenu from "./export-menu";
import OptionsMenu from "./options-menu";
import { ThemeAtom } from '../store';

const AppHeader = ({ style, type }) => {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [t, ] = useAtom(ThemeAtom);

  const toggleEditorOptions = () => {
    setOptionsMenuOpen(!optionsMenuOpen);
    setExportMenuOpen(false);
  }

  const toggleExportMenu = () => {
    setExportMenuOpen(!exportMenuOpen);
    setOptionsMenuOpen(false);
  }

  return (
    <div
      className="editor-header"
      style={{
        borderColor: t.header.borderColor,
        backgroundColor: t.header.backgroundColor,
        color: t.header.textColor,
      }}
    >
      <div
        className="editor-title"
        style={{
          color: t.header.logoColor
        }}
      >
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
            ? <OptionsMenu /> 
            : null
          } 
        </div>
      </div>
    </div>
  )
}

export default AppHeader;