const siteTitle = `atsuhan-gatsby-template`;
const siteUrl = `https://atsuhan.work`;
const siteDescription = `My projects`;

const siteMetadata = {
  siteTitle,
  siteTitleAlt: `atsuhan-gatsby-template`,
  siteHeadline: `atsuhan-gatsby-template`,
  siteUrl,
  siteDescription,
  siteLanguage: `en`,
  author: `@a_hancho`, // twitter account id
  basePath: `/webar`,
  social: {
    twitter: `https://twitter.com/a_hancho`,
    github: `https://github.com/atsuhan`,
  },
};

module.exports = {
  siteMetadata,
  plugins: [
    // style
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `static`,
      },
    },

    // mdx
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },

    // SAO
    {
      resolve: `@hpprc/gatsby-theme-core`,
      options: {
        siteTitle,
        siteUrl,
        siteDescription,
        iconPath: `./static/img/icon.jpg`,
        googleAnalyticsTrackingId: ``,
      },
    },

    // glsl
    `gatsby-plugin-glslify`,
  ],
};
