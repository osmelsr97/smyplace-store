export const formatPrice = (price: number, currency = "USD") => {
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return currencyFormat.format(price);
};
