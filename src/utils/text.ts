/**
 * Converts ALL-CAPS, mixed or lowercase strings into elegant, natural Title Case.
 * Example: "CUKUR HADE BARBERSHOP - CIKUTRA" -> "Cukur Hade Barbershop - Cikutra"
 * Example: "THE GOOD ART barbershop" -> "The Good Art Barbershop"
 * Example: "HAIRNERDS STUDIO GADING SERPONG" -> "Hairnerds Studio Gading Serpong"
 */
export function toTitleCase(str: string): string {
  if (!str) return "";

  const parts = str.split(/([\s\-–—/()&.,|]+)/);
  const result: string[] = [];
  let isFirstWord = true;

  for (const p of parts) {
    if (!p || /^[\s\-–—/()&.,|]+$/.test(p)) {
      result.push(p);
      continue;
    }

    const lower = p.toLowerCase();

    if (isFirstWord) {
      isFirstWord = false;
      if (/^(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$/i.test(p)) {
        result.push(p.toUpperCase());
      } else {
        result.push(p.charAt(0).toUpperCase() + lower.slice(1));
      }
      continue;
    }

    if (["dan", "di", "ke", "dari", "yang", "and", "of", "in", "the", "at", "by", "&"].includes(lower)) {
      result.push(lower);
      continue;
    }

    if (/^(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$/i.test(p)) {
      result.push(p.toUpperCase());
      continue;
    }

    // Capitalize word
    result.push(p.charAt(0).toUpperCase() + lower.slice(1));
  }

  return result.join("");
}
