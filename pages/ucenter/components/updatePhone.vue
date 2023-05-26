<template>
	<view>
		<p style="font-size: 25px;margin: 40px 0 10px 20px;">更换绑定手机号</p>
		<p style="margin: 0 0 60px 20px;font-size: 14px;">请输入您要重新绑定的手机号码</p>
		<view class="input">
			<span>+86</span>
			<input type="number" maxlength="11" @input="changeDisabled" v-model="phone"  placeholder="请输入您要重新绑定的手机号码">
		</view>
		<button class="confirm" :disabled="disabled" @click="confirm()">确认更换</button>
		<p style="margin: 20px 20px 0 20px;font-size: 14px;color: #808080;">修改后账号信息不变，下次需使用新手机号登录，当前手机号:{{userInfo.phone}}</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				userInfo:{},
				disabled: false
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
			changeDisabled(e){
				if(e.detail.value != ""){
					this.disabled = false
				}else{
					this.disabled = true
				}
			},
			confirm(){
				const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if(!regPhone.test(this.phone)){
					uni.showToast({
						icon:"error",
						title:'手机号格式不正确'
					})
				}else{
					this.$sendRequest({
					  url: '/users/update/personal',
					  method:"POST",
					  header:{
						authorization: 'Bearer '+uni.getStorageSync('token')
					  },
					  data: {
						  _id: this.userInfo._id,
						  phone:this.phone
					  },
					  success: (res) => {
						  console.log("到这了吗",res)
						  if(res.data.code == 200){
							  // 资料更新成功，重新获取个人信息更新缓存
							  this.$sendRequest({
								  url: '/users/find/' + this.userInfo._id,
								  method: 'GET',
								  header:{
									authorization: 'Bearer '+uni.getStorageSync('token')
								  },
								  success: (res) => {
									  if(res.data.code == 200){
										  uni.setStorageSync('userInfo',res.data.result)
										  this.userInfo = uni.getStorageSync('userInfo')
										  uni.showToast({
										  	title:'修改成功',
											icon:"success"
										  })
										  // 提示显示1500ms再跳转
										  setTimeout(() => {
											  uni.navigateBack({
											  	delta:1
											  })
										  },1500)
									  }
								  }
							  })
						  }
					  }
					})
				}
			}
		}
	}
</script>

<style lang="less">
.input{
	display: flex;
	margin: 0 20px;
	padding-bottom: 8px;
	border-bottom: 1px solid #efefef;
	span{
		color: #808080;
	}
	input{
		margin-left: 10px;
		width: 250px;
	}
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
</style>
