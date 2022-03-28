export default function CurrencyFormatter(num) {
  return "EGP " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
