/* Digital-book protection configuration for my-book.
   Keep only preview assets public. Never place the full purchased PDF here. */
window.BOOK_PREVIEW_CONFIG = {
  maxPreviewPages: 3,
  watermark: 'معاينة مجانية — my-book',
  publicAssetsOnly: true,
  delivery: {
    method: 'email-after-payment',
    provider: 'stripe-webhook',
    fullBookPublicUrl: null
  }
};
