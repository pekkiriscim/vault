const configs = {
  productPrice: {
    'trendyol.com': { selector: 'span.prc-dsc', initial: null },
    'hepsiburada.com': { selector: 'div[data-test-id="price-current-price"]', initial: null }
  },
  readTime: {
    'medium.com': { selector: 'span[data-testid="storyReadTime"]', initial: null }
  }
}

export default configs
