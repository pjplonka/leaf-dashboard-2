import Main from "./views/Main";

export default [
  {
    path: 'meals',
    component: Main,
    meta: {requiresAuth: true}
  }
];
