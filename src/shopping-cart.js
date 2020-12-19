import { LitElement, html, css } from 'lit-element';
import { LitAtom } from '@klaxon/atom';
import { cart, setShipping, shipping, setCart } from './atoms/index.js';
import { totalAmount } from './selectors/index.js';
import { host, button, ul } from './styles/index.js';

const removeFromCart = (id) => {
  setCart(old => {
    if(old[id].quantity === 1) {
      delete old[id];
    } else {
      old[id].quantity--;
    }
    return old;
  });
}

class ShoppingCart extends LitAtom(LitElement) {
  static atoms = [cart, shipping];
  static selectors = [totalAmount];
  static styles = [host, button, ul,
    css`
      li {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      span {
        margin-left: 20px;
        margin-right: 20px;
        font-weight: bold;
      }

      label {
        display: block;
      }

      img {
        margin-right: 20px;
      }
    `
  ];

  render() {
    return html`
      <ul>
        ${Object.values(this.cart).map(({name, id, img, quantity, price}) => html`
          <li>
            <img alt="${name}" src="${img}" width="40"/>
            ${name} (${quantity}x) 
            <span>total: $${(quantity * price).toFixed(2)}</span>
            <button @click=${() => {removeFromCart(id)}}>❌</button>
          </li>
        `)}
      </ul>
      <h2>Shipping:</h2>
      <div>
        <label for="shipping">Select shipping:</label>
        <select 
          id="shipping"
          @change=${e => setShipping(e.target.value)} 
          .value=${this.shipping}>
          <option value="regular">regular $10</option>
          <option value="priority">priority $20</option>
        </select>
      </div>
      <h2>Total:</h2>
      <div>
        $${this.totalAmount?.toFixed(2)}
      </div>
      <a href="/">back</a>
    `;
  }
}

customElements.define('shopping-cart', ShoppingCart);