import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: #ffffff;
    --foreground: #171717;
    --primary: #0070f3;
    --primary-hover: #0060f3;
    --secondary: #666666;
    --border: #eaeaea;
    --base: 1rem; // 16px
  }

  * {
    box-sizing: border-box;
    font-optical-sizing: auto;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  html, body, body div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, img, ul, li, ol, a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
  }

  body {
    color: var(--foreground);
    background: var(--background);
    font-family: var(--font-geist-sans);
    font-size: var(--base);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    color: #0C4A6E;
    font-size: var(--2xl);
    font-weight: 700;
  }

  h2 {
    color: var(--white);
    font-size: var(--base);
    font-weight: 600;
  }

  h3 {
    color: #000;
    font-size: var(--base);
    font-weight: 700;
  }

  svg:not([fill]) {
    fill: currentColor;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;
