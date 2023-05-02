/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  lang       : "en-US",
  title      : "Arise",
  description: 
    "Yet another light front-end framework designed for faster web developments.",

  lastUpdated: true,

  themeConfig: {
    siteTitle: "Arise Documentation",
    logo     : "/logo.png",
    nav      : getNav(),
    sidebar  : getSidebar(),
    editLink : {
      pattern: "https://github.com/Arise-Fundation/Arise/edit/main/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Arise-Fundation/Arise" },
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
      text : "Getting started",
      items: [
        { text: "Introduction", link: "/getting-started/introduction" },
        { text: "Installation", link: "/getting-started/installation" },
      ],
    },
    {
      text       : "Arise Components",
      collapsible: true,
      items      : [
        { text: "Buttons", link: "/arise-components/buttons" },
        {
          text: "Form elements", items: [
            { text: "Inputs", link: "/arise-components/inputs" },
            { text: "Radios & Checks", link: "/arise-components/radios-and-checks" },
            { text: "Automatic textarea", link: "/arise-components/form-elements" },
          ]
        },
        { text: "Tags", link: "/arise-components/tags" },
        { text: "Images", link: "/arise-components/images" },
        { text: "Alerts", link: "/arise-components/alerts" },
        { text: "Tabs", link: "/arise-components/tabs" },
        { text: "Panels", link: "/arise-components/panels" },
        { text: "Spinners", link: "/arise-components/spinners" },
        { text: "Shuffle", link: "/arise-components/shuffle" },
        { text: "Notifications", link: "/arise-components/notifications" },
        { text: "Tables", link: "/arise-components/tables" },
        { text: "Timeline", link: "/arise-components/timeline" },
      ],
    },
    {
      text       : "Arise Utilities",
      collapsible: true,
      items      : [
        { text: "Collapse", link: "/arise-utilities/collapse" },
        { text: "FormHandler", link: "/arise-utilities/formhandler" },
        { text: "Colors", link: "/arise-utilities/colors" },
        { text: "Spacing", link: "/arise-utilities/spacing" },
        { text: "Texts", link: "/arise-utilities/texts" },
      ],
    },
    {
      text       : "Advanced",
      collapsible: true,
      items      : [
        { text: "Customize", link: "/advanced/customize" },
      ],
    },
  ];
}

function getNav() {
  return [
    {
      text       : "Arise Components",
      link       : "/arise-components/buttons",
      activeMatch: "/arise-components/.*",
    },
    { text: "Contributing", link: "/contributing/documentation" },
    { text: "The team", link: "/team" },
  ];
}
