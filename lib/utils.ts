import { StrapiBlock, StrapiBlockChild, StrapiCategory } from "@/types/strapi";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the localized category name based on the current locale
 * @param category - The category object
 * @param locale - The current locale (pt, fr, en)
 * @returns The localized category name
 */
export function getLocalizedCategoryName(
  category: StrapiCategory,
  locale: string
): string {
  switch (locale) {
    case "pt":
      return category.namePT || category.name;
    case "fr":
      return category.nameFR || category.name;
    default:
      return category.name;
  }
}

/**
 * Converts a Strapi media URL to a complete URL by prefixing with the Strapi base URL
 * @param url - The relative URL from Strapi (e.g., "/uploads/image.jpg")
 * @returns The complete URL
 */
export function getStrapiMediaUrl(url: string): string {
  if (!url) return "/placeholder.svg";

  if (url.startsWith("http")) {
    return url;
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  return `${strapiUrl}${url}`;
}

export function renderStrapiBlocks(blocks: StrapiBlock[]): string {
  return blocks.map((block) => renderBlock(block)).join("");
}

function renderBlock(block: StrapiBlock): string {
  switch (block.type) {
    case "heading":
      const level = block.level || 1;
      const headingTag = `h${level}`;
      const content = renderChildren(block.children || []);
      return `<${headingTag}>${content}</${headingTag}>`;

    case "paragraph":
      const paragraphContent = renderChildren(block.children || []);
      return `<p>${paragraphContent}</p>`;

    case "list":
      const listType = block.level === 1 ? "ol" : "ul";
      const listItems =
        block.children
          ?.map((child) => {
            if (child.type === "list-item") {
              return `<li>${renderChildren(child.children || [])}</li>`;
            }
            return "";
          })
          .join("") || "";
      return `<${listType}>${listItems}</${listType}>`;

    case "list-item":
      return `<li>${renderChildren(block.children || [])}</li>`;

    case "quote":
      const quoteContent = renderChildren(block.children || []);
      return `<blockquote>${quoteContent}</blockquote>`;

    case "code":
      const codeContent = renderChildren(block.children || []);
      return `<code>${codeContent}</code>`;

    case "link":
      const linkContent = renderChildren(block.children || []);
      // You might want to add URL handling here if Strapi provides it
      return `<a href="#">${linkContent}</a>`;

    default:
      return renderChildren(block.children || []);
  }
}

function renderChildren(children: StrapiBlockChild[]): string {
  return children
    .map((child) => {
      let text = child.text;

      if (child.bold) {
        text = `<strong>${text}</strong>`;
      }

      if (child.italic) {
        text = `<em>${text}</em>`;
      }

      if (child.underline) {
        text = `<u>${text}</u>`;
      }

      return text;
    })
    .join("");
}
