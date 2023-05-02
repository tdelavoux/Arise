/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  lang: "en-US",
  title: "Atom",
  description:
    "Yet another light front-end framework designed for faster web developments.",

  lastUpdated: true,

  themeConfig: {
    siteTitle: "Atom Documentation",
    logo: "/logo.png",
    nav: getNav(),
    sidebar: getSidebar(),
    editLink: {
      pattern: "https://github.com/Atom-Fundation/Atom/edit/main/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Atom-Fundation/Atom" },
    ],
    footer: {
      // message: '',
      copyright: "Copyright © 2022-present Thibault Delavoux & Nathanaël Houn",
    },
  },
};

function getSidebar() {
  return [
    {
      text: "Getting started",
      items: [
        { text: "Introduction", link: "/getting-started/introduction" },
        { text: "Installation", link: "/getting-started/installation" },
      ],
    },
    {
      text: "Atom Components",
      collapsible: true,
      items: [
        { text: "Buttons", link: "/atom-components/buttons" },
        {
          text: "Form elements", items: [
            { text: "Inputs", link: "/atom-components/inputs" },
            { text: "Radios & Checks", link: "/atom-components/radios-and-checks" },
            { text: "Automatic textarea", link: "/atom-components/form-elements" },
          ]
        },
        { text: "Tags", link: "/atom-components/tags" },
        { text: "Images", link: "/atom-components/images" },
        { text: "Alerts", link: "/atom-components/alerts" },
        { text: "Tabs", link: "/atom-components/tabs" },
        { text: "Panels", link: "/atom-components/panels" },
        { text: "Spinners", link: "/atom-components/spinners" },
        { text: "Shuffle", link: "/atom-components/shuffle" },
        { text: "Notifications", link: "/atom-components/notifications" },
        { text: "Tables", link: "/atom-components/tables" },
        { text: "Timeline", link: "/atom-components/timeline" },
      ],
    },
    {
      text: "Atom Utilities",
      collapsible: true,
      items: [
        { text: "Collapse", link: "/atom-utilities/collapse" },
        { text: "FormHandler", link: "/atom-utilities/formhandler" },
        { text: "Colors", link: "/atom-utilities/colors" },
        { text: "Spacing", link: "/atom-utilities/spacing" },
        { text: "Texts", link: "/atom-utilities/texts" },
      ],
    },
    {
      text: "Advanced",
      collapsible: true,
      items: [
        { text: "Customize", link: "/advanced/customize" },
      ],
    },
  ];
}

function getNav() {
  return [
    {
      text: "Atom Components",
      link: "/atom-components/buttons",
      activeMatch: "/atom-components/.*",
    },
    { text: "Contributing", link: "/contributing/documentation" },
    { text: "The team", link: "/team" },
  ];
}
