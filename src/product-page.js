import { LitElement, html } from 'lit-element';
import { LitAtom } from '@klaxon/atom';
import { setActiveProduct, initProducts } from './atoms/index.js';
import { selectedProduct, addToCart } from './selectors/index.js';
import { host, button } from './styles/index.js';

class ProductPage extends LitAtom(LitElement) {
  static selectors = [selectedProduct];
  static styles = [host, button];

  async connectedCallback() {
    super.connectedCallback();
    if(!this.activeProduct) {
      await initProducts();
      setActiveProduct(Number(this.location.params.id));
    }
  }

  render() {
    return html`
      <div>
        <img alt="${this.selectedProduct?.name}" src="${this.selectedProduct?.img}"/>
        <div>${this.selectedProduct?.name}</div>
        <div>$${this.selectedProduct?.price?.toFixed(2)}</div>
        <div>
          <button @click=${() => {addToCart(this.selectedProduct)}}>🛒 add to cart</button>
        </div>
        <a href="/">back</a>
      </div>
    `;
  }
}

customElements.define('product-page', ProductPage);