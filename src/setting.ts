export const defaultPrimaryColor = '#316C72'
export const naiveThemeOverrides = {
  token: {
    colorPrimary: '#0038a8',
  },
}
export const realMenus = [
  {
    label: '首页',
    key: '/home',
  },
  {
    label: '仪器管理',
    key: '/instrument',
    children: [
      { label: '首页', key: '/instrument/index' },
      { label: '开机自检', key: '/instrument/selfInspection/index' },
      { label: '仪器配置', key: '/instrument/instrumentConfig/index' },
      {
        label: '自动进样器配置',
        key: '/instrument/autolabConfig/index',
        // name: 'injectpanelconfig',
        children: [{ label: '进样器参数盘配置', key: '/instrument/autolabConfig/paramDiskConfig' }],
      },
      {
        label: '仪器校准',
        key: '/instrument/instrumentCalibration/index',
      },
      {
        label: '历史检测任务',
        key: '/instrument/historicalTask/index',
      },
    ],
  },
]
