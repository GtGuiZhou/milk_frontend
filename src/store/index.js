import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../common/axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        menu: [
            {'icon': 'el-icon-setting', 'name': '系统配置', url: '/admin/sysconfig', sub_menu: []},
            {'icon': 'el-icon-user-solid', 'name': '管理员管理', url: '/admin/admin', sub_menu: []},
            {'icon': 'el-icon-user', 'name': '用户管理', url: '/admin/user', sub_menu: []},
            {'icon': 'el-icon-document', 'name': '用户币种记录', url: '/admin/user_coin_record', sub_menu: []},
            {'icon': 'el-icon-postcard', 'name': '实名认证', url: '/admin/user_real_verify', sub_menu: []},
            {'icon': 'el-icon-s-promotion', 'name': '项目管理', url: '/admin/item', sub_menu: []},
            {'icon': 'el-icon-s-order', 'name': '项目订单', url: '/admin/item_order', sub_menu: []},
            {'icon': 'el-icon-coin', 'name': '币种管理', url: '/admin/coin', sub_menu: []},
            {'icon': 'el-icon-add-location', 'name': '充值管理', url: '/admin/user_invest', sub_menu: []},
            {'icon': 'el-icon-delete-location', 'name': '提现管理', url: '/admin/atm', sub_menu: []},
            {'icon': 'el-icon-message-solid', 'name': '公告管理', url: '/admin/notice', sub_menu: []},
            // {
            //     'icon': 'el-icon-pie-chart', 'name': '开发', url: '', sub_menu: [
            //         {'icon': 'el-icon-coin', 'name': '数据库管理', url: '/admin/dev/database', sub_menu: []},
            //     ]
            // },
        ]
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            this.dispatch('getMenu')
        },
        setMenu(state, menu) {
            state.menu = menu
        }
    },
    actions: {
        refreshMenu(context) {

            // let menu = [
            //   {'icon': 'el-icon-user','name':'用户管理',url : '/admin/user'}
            // ]
            // context.commit('setMenu',menu)
            // axios.get('/menu/index').then(
            //     res => {
            //       context.commit('setMenu',res.data)
            //     }
            // )
        }
    }
})
