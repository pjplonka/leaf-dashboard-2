import Main from "./views/Main";

export default [
  {
    path: 'crud',
    component: Main,
    meta: {requiresAuth: true}
  }
];
