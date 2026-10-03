// @ts-check
import { defineConfig } from 'astro/config';

import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
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
    starlight({
      title: "Nibbles & Bites",
      description:
        "A composable and accessible component framework for polycule.li.",
      sidebar: [
        { label: "Home", link: "/" },
        { label: "Functionality Overview", link: "/functionality-overview/" },
      ],
      pagefind: false,
      plugins: [
        catppuccin({
          dark: { flavor: "mocha", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" },
        })
      ],
      expressiveCode: {
        themes: ["catppuccin-mocha", "catppuccin-latte"],
        useStarlightUiThemeColors: true,
      },
    }),
    solidJs(),
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
