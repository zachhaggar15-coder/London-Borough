/**
 * Some region names carry their own article ("the West of England"), which
 * reads fine after "in" or "across" but not in front of a noun: "Every the
 * West of England neighbourhood". Use `regionAdjective` wherever the name
 * describes something, and `sentenceStart` where it opens a sentence or a
 * title.
 */
export function regionAdjective(label: string): string {
  return label.replace(/^the /, "");
}

export function sentenceStart(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
