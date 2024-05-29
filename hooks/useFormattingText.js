export default function useFormattingText(text) {
  let paragraphs = text ? text.split("\n") : [];
  const heading = paragraphs.length > 0 ? paragraphs[0] : "";
  let paragraphsWithoutHeding = paragraphs;
  paragraphs = paragraphs.slice(1);
  return { heading, paragraphs, paragraphsWithoutHeding };
}
