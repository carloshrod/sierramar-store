const formatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return formatter.format(new Date(iso));
}

const monthYearFormatter = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric",
});

export function formatMonthYear(iso: string): string {
  return monthYearFormatter.format(new Date(iso));
}
