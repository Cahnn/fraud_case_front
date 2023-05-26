<template>
	<view class="app-container">
		<div class="title">
			<span>手机号注册</span>
		</div>
	 
		<div class="title-msg">
			<span>请输入注册账户和密码</span>
		</div>
	 
		<form class="login-form" method="post" novalidate>
			<!--输入框-->
			<div class="input-content">
				<!--autoFocus-->
				<div>
					<input type="number" autocomplete="off" placeholder="手机号" maxlength="11" name="phone" v-model="phone" required/>
				</div>
	 
				<div style="margin-top: 16px">
					<input type="password" autocomplete="off" placeholder="密码" name="password" v-model="password" required maxlength="32"/>
					<view class="text">
						密码请同时包含数字和字母，长度控制在6-10
					</view>
				</div>
			</div>
	 
			<!--登入按钮-->
			<div style="text-align: center">
				<button type="submit" class="enter-btn" @click="reg">注册</button>
			</div>
			<div class="foor">
				<div class="left" @click="goLogin"><span>已有账号，去登录</span></div>
			</div>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			generateRandomUsername() {
			  const length = 8; // 设置用户名的长度
			  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 设置允许出现的字符
			  let username = '';
		
			  for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				username += characters.charAt(randomIndex);
			  }
		
			  return username;
			},
			reg(){
				// 手机号正则表达校验
				const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				const regPassword = /^(?=.*[a-zA-Z])(?=.*\d).{6,10}$/;   // 包含数字和字母
				if(this.phone == '' || this.password == ''){
					uni.showToast({
						icon:"error",
						title:'手机号或密码为空'
					})
				}else if(!regPhone.test(this.phone)){
					uni.showToast({
						icon:"error",
						title:'手机号格式不正确'
					})
				}else if(!regPassword.test(this.password)){
					uni.showToast({
						icon:"error",
						title:'密码格式不正确'
					})
				}else{
					this.$sendRequest({
					  url: '/users/reg',
					  method: 'POST',
					  data:{
						  phone: this.phone,
						  password: this.password,
						  username: this.generateRandomUsername()
					  },
					  success: (res) => {
						  console.log(res)
						  if(res.data.code == 200){
							  uni.showToast({
								title:'注册成功',
								icon:"success"
							  })
							  // 提示显示1500ms再跳转
							  setTimeout(() => {
								  uni.navigateTo({
								  	url:'./components/setProblem?_id='+res.data.rel._id
								  })
							  },1500)
						  }else if(res.data.code == 300){
							  uni.showToast({
									title:'手机号已存在',
									icon:"error"
							  })
						  }
					  }
					})
				}
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
        width: 230px;
        height: 40px;
        border: 1px solid #dad9d6;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
    }
	
	.text{
		padding: 10px 0 20px 0;
		font-size: 12px;
		color: #9999A6;
	}
 
    .enter-btn {
        width: 255px;
        height: 40px;
        color: #fff;
        background: #0bc5de;
        line-height: 40px;
        text-align: center;
        border: 0px;
		margin-left: -1px;
		margin-top: 50px;
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
</style>
