import { atom } from 'jotai';
import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';
import { marked } from 'marked'; 
import DOMPurify from 'dompurify';

const colorPalette = {
  red: "#A80852",
  blue: "#103C9C",
  lightPurple: "#6A6A94",
  lighterPurple: "#9898D4",
  mediumPurple: "#7A109C",
  purple: "#30158F",
  darkPurple: "#1A0C4F",
  darkerPurple: "#1E1836",
  lighterGray: "#9898D4", // CHANGE ME
  lightGray: "#6A6A94", // CHANGE ME
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
    iconColor: colorPalette.lighterGray,
    activeToggleColor: colorPalette.mediumGray,
    buttonColor: colorPalette.lightGray,
    buttonTextColor: colorPalette.offWhite,
    activeButtonColor: colorPalette.lighterGray,
    boxShadowColor: colorPalette.darkGray, 
  },
}

export const ThemeAtom = atom(darkMode);

const CMDefaultTheme = createTheme({
    dark: 'dark',
    settings: {
      background: colorPalette.offWhite,
      foreground: colorPalette.white,
      caret: colorPalette.lighterGray,
      selection: colorPalette.lighterGray,
      selectionMatch: colorPalette.lightGray,
      gutterBackground: colorPalette.mediumGray,
      gutterForeground: colorPalette.lighterGray,
      gutterBorder: colorPalette.lightGray,
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