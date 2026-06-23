/** Scrolls to the element with `id`, accounting for the sticky navbar's height. */
export function scrollToElement(id: string, extraOffset = 0) {
  const section = document.getElementById(id);
  if (!section) return;

  const navbarHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight - extraOffset;

  window.scrollTo({ top, behavior: "smooth" });
}
