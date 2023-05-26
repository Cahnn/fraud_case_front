<template>
	<view class="app-container">
		<view class="uni-form-item uni-column">
			<view class="title">昵称</view>
			<input class="uni-input" focus v-model="userInfo.username" placeholder="输入昵称..." />
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title">性别</view>
			<radio-group @change="radioChange">
				<label class="radio"><radio value="male" :checked="userInfo.sex == 'male'" />男</label>
				<label class="radio"><radio value="female" :checked="userInfo.sex == 'female'" />女</label>
			</radio-group>
		</view>
		<!-- <view class="uni-form-item uni-column">
			<view class="title">手机号码</view>
			<input class="uni-input" type="tel"  v-model="userInfo.phone" maxlength="11" placeholder="输入手机号码..." />
		</view> -->
		<view class="uni-form-item uni-column">
			<view class="title">邮箱</view>
			<input class="uni-input" type="email" v-model="userInfo.email" placeholder="输入邮箱..." />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">个人简介</view>
			<input class="uni-input" focus v-model="userInfo.desc" placeholder="输入个人简介..."/>
		</view>
		
		<button @click="comfirm">确认修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					_id: '',
					username:'',
					sex: '',
					phone: '',
					email: '',
					desc:''
				},
				uploadHeader: {
				   authorization: 'Bearer '+uni.getStorageSync('token')
				},
			}
		},
		onLoad() {
			try{
				this.userInfo = uni.getStorageSync('userInfo')
			}catch(e){
				console.log('获取缓存失败',e)
			}
		},
		methods:{
			radioChange(event){
				if(event.detail.value == 'male'){
					this.userInfo.sex = 'male'
				}else{
					this.userInfo.sex = 'female'
				}
			},
			comfirm(){
				console.log(this.userInfo)
				this.$sendRequest({
				  url: '/users/update/personal',
				  method:"POST",
				  header:{
					authorization:this.uploadHeader.authorization
				  },
				  data: this.userInfo,
				  success: (res) => {
					  console.log("到这了吗",res)
					  if(res.data.code == 200){
						  // 资料更新成功，重新获取个人信息更新缓存
						  
						  this.$sendRequest({
							  url: '/users/find/' + this.userInfo._id,
							  method: 'GET',
							  header:{
								authorization:this.uploadHeader.authorization
							  },
							  success: (res) => {
								  if(res.statusCode == 200){
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
</script>

<style>
.app-container{
	padding: 20px;
}
.uni-input{
	border-bottom: 1px solid #e1e1e1;
}
.uni-form-item{
	margin: 20px 0;
}
.title{
	margin-bottom: 5px;
}
.radio{
	margin-right: 20px;
}
button{
	background-color: #2F85FC;
	color: #ffffff;
}
</style>
