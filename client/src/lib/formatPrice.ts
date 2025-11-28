/**
 * Format price to PKR standard format
 * Ensures all prices are prefixed with "PKR" and properly formatted
 */
export function formatPrice(price: string | number): string {
  // Convert to string if it's a number
  const priceStr = typeof price === 'number' ? price.toString() : price;
  
  // Remove any existing PKR prefix and trim whitespace
  const cleanPrice = priceStr.replace(/^PKR\s*/i, '').trim();
  
  // If the price is already a number with commas, keep it
  // Otherwise, try to format it
  if (cleanPrice.match(/^\d{1,3}(,\d{3})*(\.\d{2})?$/)) {
    return `PKR ${cleanPrice}`;
  }
  
  // If it's a plain number, add commas
  const numericPrice = cleanPrice.replace(/,/g, '');
  if (!isNaN(Number(numericPrice))) {
    const formatted = Number(numericPrice).toLocaleString('en-US');
    return `PKR ${formatted}`;
  }
  
  // If all else fails, just prepend PKR if not already there
  return cleanPrice.toLowerCase().startsWith('pkr') ? cleanPrice : `PKR ${cleanPrice}`;
}
