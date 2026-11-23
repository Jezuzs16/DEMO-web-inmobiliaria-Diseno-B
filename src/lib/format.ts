const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatUSD = (value: number) => usdFormatter.format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('es-VE').format(value);
