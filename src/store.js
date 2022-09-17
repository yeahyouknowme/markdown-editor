import { atom } from 'jotai';
import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';
import { marked } from 'marked'; 
import DOMPurify from 'dompurify';

const colorPalette = { // TEAR IT DOWN
  red: "#A80852",
  blue: "#103C9C",
  lightPurple: "#6A6A94",
  lighterPurple: "#9898D4",
  mediumPurple: "#58587A",
  purple: "#3D3D54",
  darkPurple: "#322B3B",
  darkerPurple: "#2B2533",
  lighterGray: "#918681", // CHANGE ME
  lightGray: "#5C544D", // CHANGE ME
  mediumGray: "#333347",
  darkGray: "#242533",
  darkerGray: "#12121A",
  offWhite: "#D1D1FF",
  white: "#D6D6FF",
}
const darkMode = {
  name: 'dark',
  toolbar: {
    backgroundColor: colorPalette.darkerGray,
    borderColor: colorPalette.lightGray,
    textColor: colorPalette.lighterGray,
    iconColor: colorPalette.lighterGray,
    buttonColor: colorPalette.lighterGray,
    activeButtonColor: colorPalette.lighterGray,
  },
  menu: {
    backgroundColor: colorPalette.darkGray,
    borderColor: colorPalette.mediumGray,
    textColor: colorPalette.offWhite,
    iconColor: colorPalette.lighterPurple,
    activeToggleColor: colorPalette.mediumGray,
    buttonColor: colorPalette.darkPurple,
    buttonTextColor: colorPalette.offWhite,
    activeButtonColor: colorPalette.lighterGray,
    boxShadowColor: colorPalette.darkGray, 
  },
}

export const ThemeAtom = atom(darkMode);

const CMDefaultTheme = createTheme({
    dark: 'dark',
    settings: {
      background: colorPalette.darkerGray,
      foreground: colorPalette.white,
      caret: colorPalette.lighterPurple,
      selection: colorPalette.lighterPurple,
      selectionMatch: colorPalette.lightPurple,
      gutterBackground: colorPalette.mediumGray,
      gutterForeground: colorPalette.lighterPurple,
      gutterBorder: colorPalette.lightPurple,
      lineHighlight: colorPalette.darkGray,

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