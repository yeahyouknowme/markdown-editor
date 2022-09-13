import { atom } from 'jotai';
import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';
import { marked } from 'marked'; 
import DOMPurify from 'dompurify';

const CMDefaultTheme = createTheme({
    dark: 'dark',
    settings: {
      background: '#12121A',
      foreground: '#fff',
      caret: '#AEAFAD',
      selection: '#9898d4',
      selectionMatch: '#6A6A94',
      gutterBackground: '#333347',
      gutterForeground: '#9898d4',
      gutterBorder: '#6a6a94',
      lineHighlight: '#242533',
    },
    styles: [
      { tag: t.comment, color: '#787b80' },
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.tagName, color: '#008a02' },
      { tag: t.variableName, color: '#1a00db' },
    ],
});

export const CMThemeAtom = atom(CMDefaultTheme);

const defaultText = "Write here"
const defaultHTML = marked(defaultText)
export const cleanMarkupAtom = atom(DOMPurify.sanitize(defaultHTML))