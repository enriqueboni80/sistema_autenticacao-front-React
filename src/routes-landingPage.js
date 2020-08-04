import React from 'react';

const LandingPageHome = React.lazy(() => import('./App/components/LandingPage/Home'));
const MeusEventos = React.lazy(() => import('./App/components/LandingPage/MeusEventos'));


const route = [
    { path: '/', exact: true, name: 'Home', component: LandingPageHome },
    { path: '/meus-eventos', exact: true, name: 'Home', component: MeusEventos }
];

export default route;