import React from 'react';

const LandingPageHome = React.lazy(() => import('./App/components/LandingPage/Home'));
const EventosDetalhes = React.lazy(() => import('./App/components/LandingPage/Eventos/Show'));
const MeusIngressos = React.lazy(() => import('./App/components/LandingPage/MeusIngressos'));


const route = [
    { path: '/', exact: true, name: 'index', component: LandingPageHome },
    { path: '/evento/:id', exact: true, name: 'Sample Page', component: EventosDetalhes },
    { path: '/meus-ingressos/:userId', exact: true, name: 'Home', component: MeusIngressos }
];

export default route;