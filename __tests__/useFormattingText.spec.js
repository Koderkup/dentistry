import useFormattingText from "../hooks/useFormattingText";

describe("useFormattingText", () => {
  test("should return correct object with heading, paragraphs, and paragraphsWithoutHeading", () => {
    const text = "Heading\nParagraph 1\nParagraph 2";
    const { heading, paragraphs, paragraphsWithoutHeding } =
      useFormattingText(text);

    expect(heading).toBe("Heading");
    expect(paragraphs).toEqual(["Paragraph 1", "Paragraph 2"]);
    expect(paragraphsWithoutHeding).toEqual(["Heading", "Paragraph 1", "Paragraph 2"]);
  });

  test("should return empty strings and array if text is not provided", () => {
    const text = "";
    const { heading, paragraphs, paragraphsWithoutHeding } =
      useFormattingText(text);

    expect(heading).toBe("");
    expect(paragraphs).toEqual([]);
    expect(paragraphsWithoutHeding).toEqual([]);
  });
});
