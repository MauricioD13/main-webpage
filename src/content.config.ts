import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Entries live in <collection>/<lang>/<slug>.mdx; the id becomes "<lang>/<slug>".
// `translationKey` links the same piece of content across languages.
const shared = {
  title: z.string(),
  date: z.coerce.date(),
  translationKey: z.string(),
  draft: z.boolean().default(false),
};

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      ...shared,
      subtitle: z.string(),
      summary: z.string(),
      /** Display order on the projects list (1 = first). */
      order: z.number().int().positive(),
      period: z.string(),
      role: z.string().optional(),
      stack: z.array(z.string()).default([]),
      cover: image().optional(),
      outcomes: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .default([]),
    }),
});

const stories = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      ...shared,
      description: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/books" }),
  schema: ({ image }) =>
    z.object({
      ...shared,
      book: z.object({
        title: z.string(),
        author: z.string(),
        year: z.number().int().optional(),
        pages: z.number().int().optional(),
        cover: image().optional(),
      }),
      // Each category is a shelf on /books, in the order of `bookCategories` (src/lib/books.ts).
      category: z.enum(["tech", "business", "literature"]),
      status: z.enum(["reading", "finished", "queued"]),
      rating: z.number().min(0).max(5).optional(),
      takeaways: z.array(z.string()).default([]),
      quotes: z.array(z.string()).default([]),
      relatedProjects: z.array(reference("projects")).default([]),
      /** Cloth colour, shared by every translation: the English entry's value wins. */
      spine: z.string().optional(),
    }),
});

export const collections = { projects, stories, books };
