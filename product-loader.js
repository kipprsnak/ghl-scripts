(async function () {
  const API_KEY = 'Bearer YOUR_SUBACCOUNT_API_KEY';
  const API_VERSION = '2021-07-28';
  const containerId = 'custom-product-store';

  const container = document.getElementById(containerId);
  if (!container) return console.error(`No element found with ID: ${containerId}`);

  container.innerHTML = '🔄 Loading products...';

  async function fetchProducts() {
    const res = await fetch('https://services.leadconnectorhq.com/products', {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Version': API_VERSION
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Product fetch failed: ${res.status}`, errorText);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const { products } = await res.json();
    return products.filter(p => p.isShowInStore);
  }

  async function fetchPrices(productId) {
    const res = await fetch(`https://services.leadconnectorhq.com/products/${productId}/price`, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Version': API_VERSION
      }
    });

    if (!res.ok) return [];
    const { prices } = await res.json();
    return prices || [];
  }

  function formatPrice(price) {
    const amount = (price.unitAmount / 100).toFixed(2);
    if (price.billingType === 'recurring') {
      return `Subscription (${price.billingPeriod}): $${amount}`;
    } else if (price.billingType === 'one_time') {
      return `One-Time Payment: $${amount}`;
    } else if (price.billingType === 'payment_plan') {
      return `Payment Plan (${price.billingPeriod} x ${price.billingInterval}): $${amount}`;
    } else {
      return `Other: $${amount}`;
    }
  }

  async function renderProducts() {
    try {
      const products = await fetchProducts();
      if (products.length === 0) {
        container.innerHTML = '<p>No products available.</p>';
        return;
      }

      const allProductHTML = await Promise.all(products.map(async (product) => {
        const prices = await fetchPrices(product.id);
        const priceList = prices.length
          ? prices.map(p => `<li>${formatPrice(p)}</li>`).join('')
          : '<li>No pricing available</li>';

        return `
          <div style="border:1px solid #ccc; padding:16px; margin-bottom:20px;">
            ${product.imageUrl ? `<img src="${product.imageUrl}" style="max-width:200px;">` : ''}
            <h2>${product.name}</h2>
            <p>${product.description || ''}</p>
            <h4>Pricing Options:</h4>
            <ul>${priceList}</ul>
          </div>
        `;
      }));

      container.innerHTML = allProductHTML.join('');

    } catch (error) {
      console.error(error);
      container.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
  }

  renderProducts();
})();
