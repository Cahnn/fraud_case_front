import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		userInfo: {},   // 用户数据
	},
	// mutations定义同步操作的方法
	mutations:{
		// 登录
		login(state,user){
			// 登录状态为已登陆
			state.userInfo = user
			// 存储用户数据到本地
			uni.setStorage({
				key:'userInfo',
				data: user
			})
			console.log("登录成功")
			console.log(state)
		},
		// 退出登录
		logout(state){
			// 登录状态为未登录
			state.userInfo = {}
			// 删除本地存储
			uni.removeStorage({
				key:'userInfo'
			})
			console.log('退出登录')
		}
	}
})

export default store