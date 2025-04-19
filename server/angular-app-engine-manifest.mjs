
export default {
  basePath: '/Mirouf18/ng-news-app',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
