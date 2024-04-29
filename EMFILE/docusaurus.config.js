/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EMFILE Report',
  tagline: '',
  url: 'https://emfile.test',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',
  favicon: 'img/favicon.png',
  organizationName: 'emfile', // Usually your GitHub org/user name.
  projectName: 'EmfileProject', // Usually your repo name.
  //webpack: {
  //  jsLoader: (isServer) => ({
  //    loader: require.resolve('esbuild-loader'),
  //    options: {
  //      loader: 'tsx',
  //      format: isServer ? 'cjs' : undefined,
  //      target: isServer ? 'node12' : 'es2017',
  //    },
  //  }),
  //},
  scripts: [
    {
      src: '/js/fix-location.js',
      async: false,
      defer: false,
    },
  ],
  themeConfig: {
	docs: {
      sidebar: {
        hideable: true,
		autoCollapseCategories: true,
      },
    },
	colorMode: {
      disableSwitch: true,
	},
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
		  breadcrumbs: false,
		  numberPrefixParser: false,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false
        },
       
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

};

module.exports = config;