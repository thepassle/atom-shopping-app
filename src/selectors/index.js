import { html } from 'lit-element';
import { selector } from '@klaxon/atom';
import { cart, setCart, products, activeProduct, setActiveProduct, filter, setFilter, shipping, shippingOptions } from '../atoms/index.js';
import { Router } from '@vaadin/router';

import { registerDevtools } from '@klaxon/atom';
registerDevtools();

const openProduct = id => {
  setActiveProduct(id);
  Router.go(`/product/${id}`);
}

export const addToCart = ({name, img, price, id}) => {
  setCart(old => ({
    ...old, 
    [id]: {
      id,
      img,
      name,
      price,
      quantity: old[id]?.quantity + 1 || 1
    }
  }));
}

const productsListTemplate = products => html`
  <label for="sort">Sort:</label>
  <select @change=${e => setFilter(e.target.value)} id="sort">
    <option value="ascending">ascending</option>
    <option value="descending">descending</option>
  </select>
  <ul>
    ${products.map(({name, price, id, img}) => html`
      <li>
        <img alt="${name}" src="${img}"/>
        <div>${name} $${price.toFixed(2)}</div>
        <div class="buttons">
          <button @click=${() => openProduct(id)}>view product</button>
          <button @click=${() => addToCart({name, img, price, id})}>➕</button>
        </div>
      </li>
    `)}
  </ul>
`;

export const filteredProducts = selector({
  key: 'filteredProducts',
  get: ({getAtom}) => {
    const { result } = getAtom(products);
    const filterState = getAtom(filter);

    switch(filterState) {
      case 'ascending':
        return result?.sort((a,b) => a.price - b.price);
      case 'descending':
        return result?.sort((a,b) => b.price - a.price);
      default:
        return result;
    }
  }
})

export const renderProducts = selector({
  key: 'renderProducts',
  get: async ({getAtom, getSelector}) => {
    const { status } = getAtom(products);
    const filteredList = await getSelector(filteredProducts);

    switch(status) {
      case 'success':
        return productsListTemplate(filteredList);
      case 'error':
        return html`error! :(`
      case 'initialized':
      case 'pending':
        return html`Loading...`
    }
  }
});

export const cartItems = selector({
  key: 'cartItems',
  get: ({getAtom}) => {
    const cartList = getAtom(cart);
    return Object.values(cartList).reduce((acc, {quantity}) => acc + quantity, 0);
  }
});

export const selectedProduct = selector({
  key: 'selectedProduct',
  get: ({getAtom}) => {
    const { result } = getAtom(products);
    const active = getAtom(activeProduct);
    return result?.find(({id}) => id === active) || {};
  }
});

export const totalAmount = selector({
  key: 'totalAmount',
  get: ({getAtom}) => {
    const cartList = getAtom(cart);
    const shippingOption = getAtom(shipping);

    const cartTotal = Object.values(cartList).reduce((acc, {quantity, price}) => acc + (quantity * price), 0);
    const shippingCost = shippingOptions[shippingOption];
    return cartTotal + shippingCost;
  }
})