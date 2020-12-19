import { atom } from '@klaxon/atom';

export const shippingOptions = {
  "regular": 10,
  "priority": 20,
}

export const [filter, setFilter] = atom({
  key: 'filter',
  default: 'ascending'
});

export const [shipping, setShipping] = atom({
  key: 'shipping',
  default: 'regular'
});

export const [products, initProducts] = atom({
  key: 'products',
  loadable: async () => {
    const response = await fetch('../src/data/products.json');
    const body = await response.json();
    return body.products;
  }
});

export const [cart, setCart] = atom({
  key: 'cart',
  default: {}
});

export const [activeProduct, setActiveProduct] = atom({
  key: 'activeProduct',
  default: null
});