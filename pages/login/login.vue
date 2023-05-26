<template>
	<view class="app-container">
		<div class="title">
			<span>密码登录</span>
		</div>
	 
		<div class="title-msg">
			<span>请输入登录账户和密码</span>
		</div>
	 
		<form class="login-form" method="post" novalidate>
			<!--输入框-->
			<div class="input-content">
				<!--autoFocus-->
				<div>
					<input type="number" autocomplete="off" placeholder="手机号" maxlength="11" name="phone" v-model="phone" required/>
				</div>
	 
				<div style="margin-top: 16px">
					<input type="password" autocomplete="off" placeholder="登录密码" name="password" v-model="password" required maxlength="32"/>
				</div>
			</div>
	 
			<!--登入按钮-->
			<div style="text-align: center">
				<button type="submit" class="enter-btn" @click="submit">登录</button>
			</div>
	 
			<div class="foor">
				<div class="left" @click="fogetPwd"><span>忘记密码 ?</span></div>
	 
				<div class="right" @click="reg"><span>注册账户</span></div>
			</div>
		</form>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				hasLogin: false
			}
		},
		methods: {
			...mapMutations(['login']),
			submit(){
				if(this.phone == '' || this.password == ''){
					uni.showToast({
						icon:"error",
						title:'手机号或密码为空'
					})
				}else{
					uni.request({
						url:'http://localhost:3001/users/login',
						method:"POST",
						data:{
							'phone': this.phone,
							'password': this.password
						},
						success: (res) => {
							console.log(res)
							if(res.data.code == 200){
								// 将数据存储在本地缓存中指定的 key 中,判断用户是否登录
								try{
									uni.setStorageSync('userInfo',res.data.userInfo)
									uni.setStorageSync('token',res.data.token)
								}catch(e){
									console.log('缓存失败',e)
								}
								uni.switchTab({
									url: '/pages/ucenter/ucenter'
								});
							}else if(res.data.code == 300){
								uni.showToast({
									title:res.data.msg,
									icon:"error"
								})
							}else if(res.data.code == 301){
								uni.showToast({
									title:res.data.msg,
									icon:"error"
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:"error"
								})
							}
						}
					})
				}
			},
			fogetPwd(){
				uni.navigateTo({
					url:'./components/forgetPwd'
				})
				// uni.showToast({
				// 	title:'请联系管理员:18300013191',
				// 	icon:'none'
				// })
			},
			reg(){
				uni.navigateTo({
					url:'../register/register'
				})
			}
		}
	}
</script>

<style>
	.app-container{
		padding: 50px;
	}
 
    .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
 
    .title span {
        font-size: 18px;
        color: #353f42;
    }
 
    .title-msg {
        width: 100%;
        height: 64px;
        line-height: 64px;
		margin-top: 20px;
    }
 
    .title:hover{
        cursor: default	;
    }
 
    .title-msg:hover{
        cursor: default	;
    }
 
    .title-msg span {
        font-size: 12px;
        color: #707472;
    }
 
    .input-content {
        width: 100%;
        height: 120px;
    }
 
    .input-content input {
        width: 100%;
        height: 40px;
        border: 1px solid #dad9d6;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
    }
 
    .enter-btn {
        width: 100%;
        height: 40px;
        color: #fff;
        background: #0bc5de;
        line-height: 40px;
        text-align: center;
        border: 0px;
		margin-left: -1px;
		margin-top: 30px;
    }
 
    .foor{
        width: 100%;
        height: auto;
        color: #9b9c98;
        font-size: 12px;
        margin-top: 20px;
    }
 
    .left{
        float: left;
    }
    .right{
        float: right;
		margin-right: 20px;
    }
</style>
