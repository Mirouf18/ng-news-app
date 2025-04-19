
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Mirouf18/ng-news-app/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 14717, hash: '2c0153da8a0c39d4a5cc8b9e927e901b5d66cea33fa35d43fd9807401f90c227', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14901, hash: 'a95bd2ed43f0b198fc3dd333b915340323256350aacfa98fd765ad97d94b618d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-LN63XTDA.css': {size: 522, hash: 'iwt66lz5zlE', text: () => import('./assets-chunks/styles-LN63XTDA_css.mjs').then(m => m.default)}
  },
};
