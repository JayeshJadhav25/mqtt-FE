
const accessLevel = window.localStorage.getItem('accessLevel');
// console.log('accessLevel***', accessLevel)
let accessLevelNavigation = [];

if (accessLevel == 1) {
  accessLevelNavigation = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    { name: 'Users', path: '/users', icon: 'account_circle' },
    // { name: 'Log Types', path: '/logtypes', icon: 'note' },
    {
      name: 'Devices',
      icon: 'cloud',
      children: [
        { name: 'Devices', iconText: 'FP', path: '/devices' },
        { name: 'Config', iconText: 'FP', path: '/config' },
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
    { name: 'Audit Log', path: '/auditlog', icon: 'history' },
    // {
    //   name: 'Components',
    //   icon: 'favorite',
    //   badge: { value: '30+', color: 'secondary' },
    //   children: [
    //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
    //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
    //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
    //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
    //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
    //     { name: 'Form', path: '/material/form', iconText: 'F' },
    //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
    //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
    //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
    //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
    //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
    //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
    //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
    //     { name: 'Table', path: '/material/table', iconText: 'T' },
    //   ],
    // },
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
  ]
}
else if (accessLevel == 2) {
  accessLevelNavigation = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    { name: 'Users', path: '/users', icon: 'account_circle' },
    // { name: 'Log Types', path: '/logtypes', icon: 'note' },
    {
      name: 'Devices',
      icon: 'cloud',
      children: [
        { name: 'Devices', iconText: 'FP', path: '/devices' },
        // { name: 'Config', iconText: 'FP', path: '/config' },
        { name: 'Maintenance', iconText: 'FP', path: '/maintenance' },

      ],
    },
    {
      name: 'Reports',
      icon: 'security',
      children: [
        // { name: 'Logger Report', iconText: 'FP', path: '/logger' },
        { name: 'Door Report', iconText: 'SU', path: '/report/door' },
        { name: 'State Report', iconText: '404', path: '/report/state' },
      ],
    },
    { name: 'Audit Log', path: '/auditlog', icon: 'history' },
    // {
    //   name: 'Components',
    //   icon: 'favorite',
    //   badge: { value: '30+', color: 'secondary' },
    //   children: [
    //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
    //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
    //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
    //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
    //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
    //     { name: 'Form', path: '/material/form', iconText: 'F' },
    //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
    //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
    //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
    //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
    //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
    //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
    //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
    //     { name: 'Table', path: '/material/table', iconText: 'T' },
    //   ],
    // },
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
  ]
} else if (accessLevel == 3) {
  accessLevelNavigation = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    // { name: 'Users', path: '/users', icon: 'account_circle' },
    // { name: 'Log Types', path: '/logtypes', icon: 'note' },
    {
      name: 'Devices',
      icon: 'cloud',
      children: [
        { name: 'Devices', iconText: 'FP', path: '/devices' },
        // { name: 'Config', iconText: 'FP', path: '/config' },
        { name: 'Maintenance', iconText: 'FP', path: '/maintenance' },

      ],
    },
    {
      name: 'Reports',
      icon: 'security',
      children: [
        // { name: 'Logger Report', iconText: 'FP', path: '/logger' },
        { name: 'Door Report', iconText: 'SU', path: '/report/door' },
        { name: 'State Report', iconText: '404', path: '/report/state' },
      ],
    },
    // { name: 'Audit Log', path: '/auditlog', icon: 'history' },
    // {
    //   name: 'Components',
    //   icon: 'favorite',
    //   badge: { value: '30+', color: 'secondary' },
    //   children: [
    //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
    //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
    //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
    //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
    //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
    //     { name: 'Form', path: '/material/form', iconText: 'F' },
    //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
    //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
    //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
    //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
    //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
    //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
    //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
    //     { name: 'Table', path: '/material/table', iconText: 'T' },
    //   ],
    // },
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
  ]
}
export const navigations = accessLevelNavigation;  // Your navigation array
