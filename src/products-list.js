import { LitElement, css } from 'lit-element';
import { LitAtom } from '@klaxon/atom';
import { initProducts } from './atoms/index.js';
import { renderProducts } from './selectors/index.js';
import { host, ul, button } from './styles/index.js';

class ProductsList extends LitAtom(LitElement) {
  static selectors = [renderProducts];
  static styles = [host, ul, button,
    css`
      li { 
        border-radius: 5px; 
        border: solid 1px #ededed;
      }
      li:hover {
        border: solid 1px black;
      }

      .buttons {
        display: flex;
        justify-content: center;
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    initProducts();
  }

  render() {
    return this.renderProducts;
  }
}

customElements.define('products-list', ProductsList);