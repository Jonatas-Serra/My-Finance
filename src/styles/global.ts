import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #181d29;
    --primary: #733cf8;
    --secondary: #08C6AB;
    --tertiary: #dc2020;
    --quaternary: #5AFFE7;
    --quinary: #37465B;
    --white: #F5F5F5;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  * {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: var(--background);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--quinary);
  border-radius: 20px;
  border: 3px solid var(--background);
}

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
  input[type=number] {
    -moz-appearance: textfield;
  }


  html {
    @media(max-width: 1080px) {
      font-size: 93.75%;
    }

    @media(max-width: 720px) {
      font-size: 87.5%;
    }

    @media(max-width: 480px) {
      font-size: 81.25%;
    }
  }

  body {
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    font-family: 'Montserrat', sans-serif;
    textarea:focus, input:focus, select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    }   
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;

    background-color: var(--quinary);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
  }

  .react-modal-close {
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;

    border: 0;
    background-color: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
  
`;
