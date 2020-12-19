import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import { Router } from '@vaadin/router';
import { LitAtom } from '@klaxon/atom';
import { cartItems } from './selectors/index.js';
import './products-list.js';

export class ShoppingApp extends LitAtom(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
    }

    header {
      height: 50px;
      width: calc(100% - 40px);
      display: flex;
      flex-direction: row;
      padding-left: 20px;
      padding-right: 20px;
      justify-content: center;
    }

    .title {
      margin: 0;
      flex: 1;
      font-size: 40px;
      text-decoration: none;
      color: black;
    }

    .title:hover, .title:active, .title:focus {
      color: blue;
      text-decoration: underline;
    }

    header div {
      display: flex;
      align-items: center;
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  static selectors = [cartItems];

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('root'));

    router.setRoutes([
      {
        path: '/',
        component: 'products-list',
      },
      {
        path: '/product/:id',
        component: 'product-page',
        action: () => { import('./product-page.js');}
      },
      {
        path: '/cart',
        component: 'shopping-cart',
        action: () => { import('./shopping-cart.js');}
      },
    ]);
  }

  render() {
    return html`
      <header>
        <a class="title" href="/">My shop</a>
        <div>
          <a href="/cart">cart</a> <span>(${this.cartItems})</span>
        </div>
      </header>

      <main>
        <div id="root"></div>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}


customElements.define('shopping-app', ShoppingApp);
