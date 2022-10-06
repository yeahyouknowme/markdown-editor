import { atom } from 'jotai';
import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';
import { githubDark } from '@uiw/codemirror-theme-github';
import { marked } from 'marked'; 
import DOMPurify from 'dompurify';

const colorPalette = { // TEAR IT DOWN
  offWhite: "#CCCCCC",
  lightGray: "#C9D1D9",
  mediumGray: "#333338",
  darkGray: "#24292E",
  darkestGray: "#0D1117",
  lightRed: "#FF7B72",
  red: "#D73A49",
  lightBlue: "#79C0FF",
  blue: "#005CC5",
  lightPurple: "#D2A8FF",
  purple: "#6F42C1",
  lightGreen: "#7EE787",
  green: "#22863A",
}

const darkMode = {
  name: "dark",
  header: {
    backgroundColor: colorPalette.darkestGray,
    textColor: colorPalette.offWhite,
    borderColor: colorPalette.mediumGray,
    logoColor: colorPalette.lightPurple,
  },
  menu: {
    backgroundColor: colorPalette.darkestGray,
    borderColor: colorPalette.mediumGray,
    textColor: colorPalette.offWhite,
  },
}

export const ThemeAtom = atom(darkMode);

export const colorPaletteAtom = atom(colorPalette);

export const editorThemeAtom = atom(githubDark);
export const editorThemeTypeAtom = atom("Dark");

const defaultText = "Write here"
const defaultHTML = marked(defaultText)
export const cleanMarkupAtom = atom(DOMPurify.sanitize(defaultHTML))

export const vimBindingsAtom = atom(false);
export const editorFontSizeAtom = atom(14);
export const outputFontSizeAtom = atom(16);
export const outputFontStyleAtom = atom("sans-serif");