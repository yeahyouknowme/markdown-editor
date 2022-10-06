import { useState } from 'react';
import { useAtom } from 'jotai';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import {
  editorFontSizeAtom,
  outputFontSizeAtom,
  outputFontStyleAtom,
  ThemeAtom,
  vimBindingsAtom,
  editorThemeTypeAtom,
  editorThemeAtom
} from '../store';

const OptionsMenu = () => {
  const [vimBindings, setVimBindings] = useAtom(vimBindingsAtom);
  const [editorFontSize, setEditorFontSize] = useAtom(editorFontSizeAtom);
  const [outputFontSize, setOutputFontSize] = useAtom(outputFontSizeAtom);
  const [outputFontStyle, setOutputFontStyle] = useAtom(outputFontStyleAtom);
  const [editorTheme, setEditorTheme] = useAtom(editorThemeAtom);
  const [t, ] = useAtom(ThemeAtom);

  const [editorThemeType, setEditorThemeType] = useAtom(editorThemeTypeAtom);


  const toggleVim = (e) => {
    e.preventDefault();
    setVimBindings(!vimBindings);
  }

  const toggleEditorTheme = (e) => {
    e.preventDefault();
    if(editorThemeType == "Dark") {
      setEditorTheme(githubLight);
      setEditorThemeType("Light")
    } else {
      setEditorTheme(githubDark);
      setEditorThemeType("Dark");
    }
    
  }

  return (
    <div
      className="options-menu"
      style={{
        borderColor: t.menu.borderColor,
        backgroundColor: t.menu.backgroundColor,
        color: t.menu.textColor,
      }}
    >
      <div
        className="option-col"
        style={{
          borderColor: t.menu.borderColor,
        }}
      >
        Font Style
        <div className="fontstyle-group">
          <button 
            className="fontstyle-button"
            onClick={e => setOutputFontStyle("sans-serif")}
            style={{
              fontFamily: "sans-serif",
              fontSize: "x-large",
              fontWeight: "bold",
              backgroundColor: outputFontStyle == "sans-serif" ? t.menu.textColor : t.menu.activeButtonColor,
            }}
          >
            A
          </button>
          <button
            className="fontstyle-button"
            onClick={e => setOutputFontStyle("serif")}
            style={{
              fontFamily: "serif",
              fontSize: "x-large",
              fontWeight: "bold",
              backgroundColor: outputFontStyle == "serif" ? t.menu.textColor : t.menu.activeButtonColor,
            }}
          >
            A
          </button>
          <button
            className="fontstyle-button"
            onClick={e => setOutputFontStyle("monospace")}
            style={{
              fontFamily: "monospace",
              fontSize: "xx-large",
              fontWeight: "bold",
              backgroundColor: outputFontStyle == "monospace" ? t.menu.textColor : t.menu.activeButtonColor,
            }}
          >
            A
          </button>
        </div>
      </div>
      <div 
        className="option-row"
        style={{
          borderColor: t.menu.borderColor,
        }}
      >
        <span
          style={{
            color: t.menu.boxShadowColor,
          }}
        >
          Editor Font Size:
          <input type="text" onChange={e => setEditorFontSize(e.target.value)} className="fontsize-input" defaultValue={editorFontSize} />
        </span>
      </div>
      <div 
        className="option-row"
        style={{
          borderColor: t.menu.borderColor
        }}
      >
        <span
          style={{
            color: t.menu.boxShadowColor,
          }}
        >
          Output Font Size:
          <input type="text" onChange={e => setOutputFontSize(e.target.value)} className="fontsize-input" defaultValue={outputFontSize} />
        </span>
      </div>
      <div 
        className="option-row"
        style={{
          borderColor: t.menu.borderColor
        }}
      >
        <span
          style={{
            color: t.menu.boxShadowColor,
          }}
        >
          VIM Bindings:
        </span>
        <div 
          className="toggle-button-group"
          style={{
            borderColor: t.menu.borderColor
          }}
        >
          <button
            className="toggle-button"
            onClick={toggleVim}
            style={{
              backgroundColor: !vimBindings ? t.menu.activeToggleColor : t.menu.inactiveToggleColor,
              color: !vimBindings ? t.menu.textColor : t.menu.inactiveToggleColor,
            }}
          >
            {vimBindings ? "Off" : "Off"}
          </button>
          <button
            className="toggle-button"
            onClick={toggleVim}
            style={{
              backgroundColor: vimBindings ? t.menu.activeToggleColor : t.menu.inactiveToggleColor,
              color: vimBindings ? t.menu.textColor : t.menu.inactiveToggleColor,
            }}
          >
            {vimBindings ? "On" : "On"}
          </button>
        </div>
      </div>
      <div 
        className="option-row"
        style={{
          borderColor: t.menu.borderColor
        }}
      >
        Editor Color:
        <button
          onClick={toggleEditorTheme}
        >
          { editorThemeType }
        </button>
      </div>
    </div>
  )
}

export default OptionsMenu;