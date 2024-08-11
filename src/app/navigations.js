
// const accessLevel = window.localStorage.getItem('accessLevel');
// console.log('accessLevel***', accessLevel)
let accessLevelNavigation = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { name: 'Users', path: '/users', icon: 'account_circle' },
  // { name: 'Device', path: '/device', icon: 'cloud' },
  // { name: 'Devices', path: '/devices', icon: 'cloud' },
  // { name: 'Device Config', path: '/deviceconfig', icon: 'device_hub' },
  { name: 'Log Types', path: '/logtypes', icon: 'note' },
  // { name: 'Logger', path: '/logger', icon: 'note' },
  // { name: 'Maintenance', path: '/maintenance',  icon: 'note' },

  // { name: 'Logger', path: '/logger', icon: 'note' },
  // { label: 'PAGES', type: 'label' },
  {
    name: 'Devices',
    icon: 'cloud',
    children: [
      { name: 'Devices', iconText: 'FP', path: '/devices' },
      { name: 'Device Config', iconText: 'FP', path: '/deviceconfig' },
      { name: 'Maintenance', iconText: 'FP', path: '/maintenance' },

    ],
  },
  {
    name: 'Reports',
    icon: 'security',
    children: [
      { name: 'Logger Report', iconText: 'FP', path: '/logger' },
      { name: 'Door Report', iconText: 'SU', path: '/report/door' },
      { name: 'State Report', iconText: '404', path: '/report/state' },
    ],
  },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  // { label: 'Components', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
// if (accessLevel == 1) {
//   accessLevelNavigation = [
//     { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
//     { name: 'Users', path: '/users', icon: 'account_circle' },
//     // { name: 'Device', path: '/device', icon: 'cloud' },
//     // { name: 'Devices', path: '/devices', icon: 'cloud' },
//     // { name: 'Device Config', path: '/deviceconfig', icon: 'device_hub' },
//     { name: 'Log Types', path: '/logtypes', icon: 'note' },
//     // { name: 'Logger', path: '/logger', icon: 'note' },
//     // { name: 'Maintenance', path: '/maintenance',  icon: 'note' },

//     // { name: 'Logger', path: '/logger', icon: 'note' },
//     // { label: 'PAGES', type: 'label' },
//     {
//       name: 'Devices',
//       icon: 'cloud',
//       children: [
//         { name: 'Devices', iconText: 'FP', path: '/devices' },
//         { name: 'Device Config', iconText: 'FP', path: '/deviceconfig' },
//         { name: 'Maintenance', iconText: 'FP', path: '/maintenance' },

//       ],
//     },
//     {
//       name: 'Reports',
//       icon: 'security',
//       children: [
//         // { name: 'Door Report', iconText: 'SI', path: '/session/signin' },
//         // { name: 'State Report', iconText: 'SU', path: '/session/signup' },
//         { name: 'Logger Report', iconText: 'FP', path: '/logger' },
//         // { name: 'Email Logs', iconText: '404', path: '/session/404' },
//       ],
//     },
//     // {
//     //   name: 'Session/Auth',
//     //   icon: 'security',
//     //   children: [
//     //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
//     //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
//     //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
//     //     { name: 'Error', iconText: '404', path: '/session/404' },
//     //   ],
//     // },
//     // { label: 'Components', type: 'label' },
//     {
//       name: 'Components',
//       icon: 'favorite',
//       badge: { value: '30+', color: 'secondary' },
//       children: [
//         { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
//         { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
//         { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
//         { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
//         { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
//         { name: 'Form', path: '/material/form', iconText: 'F' },
//         { name: 'Icons', path: '/material/icons', iconText: 'I' },
//         { name: 'Menu', path: '/material/menu', iconText: 'M' },
//         { name: 'Progress', path: '/material/progress', iconText: 'P' },
//         { name: 'Radio', path: '/material/radio', iconText: 'R' },
//         { name: 'Switch', path: '/material/switch', iconText: 'S' },
//         { name: 'Slider', path: '/material/slider', iconText: 'S' },
//         { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
//         { name: 'Table', path: '/material/table', iconText: 'T' },
//       ],
//     },
//     // {
//     //   name: 'Charts',
//     //   icon: 'trending_up',
//     //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
//     // },
//     // {
//     //   name: 'Documentation',
//     //   icon: 'launch',
//     //   type: 'extLink',
//     //   path: 'http://demos.ui-lib.com/matx-react-doc/',
//     // },
//   ];
// }
export const navigations = accessLevelNavigation;  // Your navigation array
