import React from 'react';

const SignUp1 = React.lazy(() => import('./App/components/Authentication/SignUp/SignUp1'));
const SignIn1 = React.lazy(() => import('./App/components/Authentication/SignIn/SignIn1'));
const ResetPassword1 = React.lazy(() => import('./App/components/Authentication/ResetPassword/ResetPassword1'));
const ChangePassword = React.lazy(() => import('./App/components/Authentication/ChangePassword'));


const route = [
    { path: '/auth/signup', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin', exact: true, name: 'Signin 1', component: SignIn1 },
    { path: '/auth/reset-password', exact: true, name: 'Reset Password 1', component: ResetPassword1 },
    { path: '/auth/change-password', exact: true, name: 'Change Password', component: ChangePassword },
];

export default route;