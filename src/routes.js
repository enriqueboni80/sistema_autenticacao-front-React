import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const HomeAdmin = React.lazy(() => import('./App/components/HomeAdmin'));
const Eventos = React.lazy(() => import('./App/components/Eventos'));
const EventosInscricoes = React.lazy(() => import('./App/components/Eventos/Inscricoes/ListaInscritos'));
const EventosDetalhes = React.lazy(() => import('./App/components/Eventos/Show'));
const TesteIntegracao = React.lazy(() => import('./App/components/TesteIntregacao'));

const routes = [
    { path: '/home', exact: true, name: 'Sample Page', component: HomeAdmin },
    { path: '/home/gerenciar-eventos', exact: true, name: 'Sample Page', component: Eventos },
    { path: '/home/gerenciar-eventos/inscricoes/:id', exact: true, name: 'Sample Page', component: EventosInscricoes },
    { path: '/home/gerenciar-eventos/:id', exact: true, name: 'Sample Page', component: EventosDetalhes },
    { path: '/home/teste-integracao', exact: true, name: 'Sample Page', component: TesteIntegracao },
];

export default routes;