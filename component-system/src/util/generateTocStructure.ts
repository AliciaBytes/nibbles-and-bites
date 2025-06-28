import type { MarkdownHeading } from "astro";
export interface TocItem extends MarkdownHeading {
  children: TocItem[];
}

function findCorrectChildrenLevel(item: TocItem, depth: number): TocItem[] {
  if (depth <= 0) {
    throw new Error("Invalid ToC levels.");
  }

  if (depth === 1) {
    return item.children;
  }

  return findCorrectChildrenLevel(
    item.children[item.children.length - 1],
    depth - 1,
  );
}

export default function generateTocStructure(headings: MarkdownHeading[]) {
  let toc: TocItem[] = [];

  if (headings.length < 1) {
    return toc;
  }

  const firstItem = headings.shift()!;

  if (headings.some((heading) => heading.depth < firstItem.depth)) {
    throw new Error(
      "Problewm in the structure of the ToC, check the heading levels.",
    );
  }

  toc.push({
    ...firstItem,
    children: [],
  });

  for (const heading of headings) {
    if (heading.depth === firstItem.depth) {
      toc.push({
        ...heading,
        children: [],
      });
    } else {
      const lastItem = toc[toc.length - 1];
      const target = findCorrectChildrenLevel(
        lastItem,
        heading.depth - firstItem.depth,
      );

      target.push({
        ...heading,
        children: [],
      });
    }
  }

  return toc;
}
