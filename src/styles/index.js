import { css } from 'lit-element';

export const li = css``;

export const ul = css`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const host = css`
  :host {
    display: block;
    text-align: center;
    margin-top: 60px;
  }
`;

export const button = css`
  button {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 3px;
    background: none;
    border: solid 2px black;
    padding: 5px 10px;
    font-size: 18px;
    height: 40px;
  }

  button:hover, button:active, button:focus {
    background-color: #d7d7d7;
  }
`;