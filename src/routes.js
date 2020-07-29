import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const TesteIntegracao = React.lazy(() => import('./App/components/TesteIntregacao'));
const PrivatedAccess = React.lazy(() => import('./App/components/PrivatedAccess'));

const routes = [
    { path: '/home', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/privated-access', exact: true, name: 'Sample Page', component: PrivatedAccess },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/teste-integracao', exact: true, name: 'Sample Page', component: TesteIntegracao },
];

export default routes;