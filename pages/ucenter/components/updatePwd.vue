<template>
	<view>
		<p style="font-size: 25px;margin: 40px 0 60px 20px;">请设置新密码</p>
		<view class="input">
			<span>请输入旧密码</span>
			<input class="uni-input" :type="showPassword ? 'text' : 'password'" placeholder="Enter Password" v-model="oldPwd" />
			<span class="toggle-button" @click="togglePasswordVisibility()">
			  <img id="toggleIcon" class="toggleIcon" src="/static/icons/eye-open.png" alt="Toggle Password Visibility">
			</span>
		</view>
		<view class="input">
			<span>请输入新密码</span>
			<input class="uni-input" :type="showPassword2 ? 'text' : 'password'" placeholder="Enter Password" v-model="newPwd" />
			<span class="toggle-button" @click="togglePasswordVisibility2()">
			  <img id="toggleIcon2" class="toggleIcon" src="/static/icons/eye-open.png" alt="Toggle Password Visibility">
			</span>
		</view>
		<view class="input">
			<span>再次确认密码</span>
			<input class="uni-input" :type="showPassword3 ? 'text' : 'password'" placeholder="Enter Password" v-model="confirmPwd" />
			<span class="toggle-button" @click="togglePasswordVisibility3()">
			  <img id="toggleIcon3" class="toggleIcon" src="/static/icons/eye-open.png" alt="Toggle Password Visibility">
			</span>
		</view>
		
		<view class="text">
			密码请同时包含数字和字母，长度控制在6-10
		</view>
		<button class="confirm" :disabled="disabled" @click="confirm()">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				disabled:false,
				oldPwd:'',
				newPwd:'',
				confirmPwd:'',
				password:'',
				userInfo:{},
				showPassword: false,
				showPassword2: false,
				showPassword3: false
			}
		},
		onLoad() {
			this.getStorageUser()
		},
		methods: {
			getStorageUser(){
				try{
					this.userInfo = uni.getStorageSync('userInfo')
				}catch(e){
					console.log('获取缓存失败',e)
				}
			},
			confirm(){
				const regPassword = /^(?=.*[a-zA-Z])(?=.*\d).{6,10}$/;
				// 首先判断是否有字段为空
				if(this.oldPwd == '' || this.newPwd == '' || this.confirmPwd == ''){
					uni.showToast({
						title:'请填写所有字段',
						icon:"none"
					})
				}else{
					if(!regPassword.test(this.newPwd)){
						uni.showToast({
							icon:"error",
							title:'密码格式不正确'
						})
					}else if(this.newPwd !== this.confirmPwd){   // 判断新密码和再次确认的密码相不相同
						uni.showToast({
							title:'新密码与再次确认的密码不相同',
							icon:"none"
						})
					}else{
						// 判断旧密码是否正确(没有缓存密码)
						uni.request({
							url:'http://localhost:3001/users/login',
							method:"POST",
							data:{
								'phone': this.userInfo.phone,
								'password': this.oldPwd
							},
							success: (res) => {
								console.log(res)
								if(res.data.code == 200){
									// 旧密码正确
									this.$sendRequest({
									  url: '/users/update/pwd',
									  method:"POST",
									  header:{
										authorization: 'Bearer '+uni.getStorageSync('token')
									  },
									  data: {
										  _id: this.userInfo._id,
										  password: this.newPwd
									  },
									  success: (res) => {
										  if(res.data.code == 200){
											  uni.showToast({
											  	title:'密码修改成功',
											  	icon:"success"
											  })
											  // 提示显示1500ms再跳转
											  setTimeout(() => {
												  uni.navigateBack({
													delta:1
												  })
											  },1500)
										  }else if(res.data.code == 300){
											  uni.showToast({
											  	title:'新密码与旧密码不能相同',
											  	icon:"error"
											  })
										  }
									  }
									})
								}else{
									uni.showToast({
										title:'旧密码错误',
										icon:"error"
									})
								}
							}
						})
					}
				}
			},
			changeDisabled(e){
				if(e.detail.value != ""){
					this.disabled = false
				}else{
					this.disabled = true
				}
			},
			togglePasswordVisibility() {
			      this.showPassword = !this.showPassword;
				  if (this.showPassword) {
					  toggleIcon.src = "/static/icons/eye-closed.png";
				  } else {
					  toggleIcon.src = "/static/icons/eye-open.png";
				  }
			},
			togglePasswordVisibility2() {
			      this.showPassword2 = !this.showPassword2;
				  if (this.showPassword2) {
					  toggleIcon2.src = "/static/icons/eye-closed.png";
				  } else {
					  toggleIcon2.src = "/static/icons/eye-open.png";
				  }
			},
			togglePasswordVisibility3() {
			      this.showPassword3 = !this.showPassword3;
				  if (this.showPassword3) {
					  toggleIcon3.src = "/static/icons/eye-closed.png";
				  } else {
					  toggleIcon3.src = "/static/icons/eye-open.png";
				  }
			}
		}
	}
</script>

<style lang="less">
.input{
	display: flex;
	margin: 20px 20px;
	padding-bottom: 8px;
	border-bottom: 1px solid #efefef;
	input{
		margin-left: 10px;
		width: 200px;
	}
}
.text{
	padding-left: 20px;
	font-size: 12px;
	color: #9999A6;
}
.uni-input{
	border: none;
	outline: none;
	padding-left: 10px;
	font-size: 16px;
	padding-bottom: 5px;
}
.confirm{
	width: 90%;
	height: 40px;
	line-height: 40px;
	color: #fff;
	background-color: #2F85FC;
	border-radius: 20px;
	text-align: center;
	font-weight: 500;
	font-size: 16px;
	margin-top: 100px;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
uni-button:after{
	border: none;
}
	.toggleIcon{
		width: 25px;
		height: 25px;
	}
</style>
