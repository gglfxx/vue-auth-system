import Vue from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon'// svg组件

// 导入所有svg图标，然后结合svg-sprite-loader可以按需使用
const requireContext = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(requireContext)

Vue.component('svg-icon', SvgIcon)
