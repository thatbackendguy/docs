// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ThatBackendGuy',
  tagline: 'Backend is fun ❤️',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'thatbackendguy', // Usually your GitHub org/user name.
  projectName: 'thatbackendguy', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'ThatBackendGuy',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blogs', position: 'right' },
          {
            href: 'https://github.com/thatbackendguy/',
            'aria-label': 'GitHub',
            className: 'navbar__icon navbar__github',
            position: 'right',
            html: '<i class="fa fa-github"></i>',
          },
        ],
      },
      footer: {
        links: [
          {
            label: 'Blogs',
            href: '/blog',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/thatbackendguy/',
          },
          {
            label: 'Instagram',
            href: 'https://instagram.com/thatbackendguy/',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/thatbackendguyy',
          },
          {
            label: 'Contact',
            href: 'mailto:yashpra1010@gmail.com',
          },

        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
