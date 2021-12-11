import Main from "./views/Main";

export default [
  {
    path: 'pages',
    component: Main,
    meta: {requiresAuth: true}
  }
];
