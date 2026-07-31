// Simple localStorage-based cart manager
const CART_KEY = 'circuitworld_cart';

export const cartService = {
  getCart: () => {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  },

  saveCart: (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event so other components (like Navbar) can update
    window.dispatchEvent(new Event('cartUpdated'));
  },

  addToCart: (product, quantity = 1) => {
    const cart = cartService.getCart();
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    
    cartService.saveCart(cart);
  },

  updateQuantity: (productId, quantity) => {
    let cart = cartService.getCart();
    const index = cart.findIndex(item => item.product.id === productId);
    
    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
      cartService.saveCart(cart);
    }
  },

  removeFromCart: (productId) => {
    let cart = cartService.getCart();
    cart = cart.filter(item => item.product.id !== productId);
    cartService.saveCart(cart);
  },

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('cartUpdated'));
  },

  getCartCount: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
};
