// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import compress from 'astro-compress';
import sitemap from "@astrojs/sitemap";
import astroMetaTags from "astro-meta-tags";
import expressiveCode from 'astro-expressive-code';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

// https://astro.build/config
export default defineConfig({
  site: "https://nibbles-and-bites.polycule.li",
  image: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  integrations: [
    solidJs(),
    expressiveCode(
      {
        themeCssSelector: (theme, context) => `[data-selected-theme="${theme.name}"]`,
        themes: [
          "catppuccin-frappe",
          "catppuccin-latte",
          "catppuccin-macchiato",
          "catppuccin-mocha"
        ],
        useStyleReset: false,
        useThemedSelectionColors: true,
        styleOverrides: {
          borderColor: ({ theme }) => theme.colors['titleBar.activeBackground'],
        }
      }
    ),
    mdx(),
    sitemap(),
    pagefind(),
    astroMetaTags(),
    compress({
      CSS: false,
      HTML: {
        "collapseWhitespace": true,
        "collapseInlineTagWhitespace": true,
        "preserveLineBreaks": true,
        "conservativeCollapse": true,
        "decodeEntities": true,
        "minifyCSS": true,
        "minifyJS": true,
        "removeComments": true,
        "removeScriptTypeAttributes": true,
        "removeStyleLinkTypeAttributes": true,
        "sortAttributes": true,
        "sortClassName": true,
        "useShortDoctype": true
      },
      Image: false,
      JavaScript: false,
      SVG: false,
    }),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    syntaxHighlight: false,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        errorRecovery: true,
        targets: browserslistToTargets(browserslist('defaults')),
      }
    },
    logLevel: 'error',
    ssr: {
      noExternal: ['sanitize.css'],
    },
  },
});
