import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const Eventos = React.lazy(() => import('./App/components/Eventos'));
const EventosInscricoes = React.lazy(() => import('./App/components/Eventos/Inscricoes/ListaInscritos'));
const TesteIntegracao = React.lazy(() => import('./App/components/TesteIntregacao'));
const PrivatedAccess = React.lazy(() => import('./App/components/PrivatedAccess'));

const routes = [
    { path: '/home', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/home/gerenciar-eventos', exact: true, name: 'Sample Page', component: Eventos },
    { path: '/home/gerenciar-eventos/inscricoes/:id', exact: true, name: 'Sample Page', component: EventosInscricoes },
    { path: '/home/teste-integracao', exact: true, name: 'Sample Page', component: TesteIntegracao },
];

export default routes;