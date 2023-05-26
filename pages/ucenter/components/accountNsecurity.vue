<template>
	<view>
		<view class="ques">
			<uni-list>
				<uni-list-item showArrow title="修改手机号" link to="./updatePhone" :clickable="true" />
				<uni-list-item showArrow title="修改密码" link to="./updatePwd" :clickable="true" />
				<uni-list-item showArrow title="修改密保答案" link to="./updateAnswer" :clickable="true" />
			</uni-list>
			
			<uni-list style="margin-top: 15px;">
				<uni-list-item showArrow title="注销帐号" rightText="请谨慎操作" :clickable="true" @click="unsubscribe()" />
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		created() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			// 注销帐号
			unsubscribe(){
				uni.showModal({
					title:'提示',
					content:'确定注销？注销后不可再找回帐号！',
					cancelText:'取消',
					confirmText: '确定',
					showCancel: true,
					confirmColor:'#f55850',
					cancelColor:'#39B54A',
					success: (res) => {
						if(res.confirm){
							this.$sendRequest({
								  url: '/users/del',
								  method: 'POST',
								  header:{
								  	authorization: 'Bearer '+uni.getStorageSync('token')
								  },
								  data:{
									  '_id': this.userInfo._id
								  },
								  success: (res) => {
									  if(res.statusCode == 200){
										  uni.showToast({
										  	title:'注销成功',
										  	icon:"success"
										  })
										  // 提示显示1500ms再跳转
										  setTimeout(() => {
											  uni.navigateTo({
											  	url:'../../register/register'
											  })
										  },1500)
									  }
								  }
							})
						}else{
							console.log('no')
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
	.uni-list-item{
		height: 50px;
	}
.ques{
	width: 90%;
	margin: 20px auto;
}
</style>
