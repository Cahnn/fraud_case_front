<template>
	<view>
		<view class="list">
			<p class="text">账号安全设置</p>
			<uni-list>
				<uni-list-item showArrow="true" title="账号与安全" link to="./accountNsecurity" :clickable="true"/>
			</uni-list>
			
			<button class="logout" @click="logout()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				uni.removeStorageSync('userInfo')
				uni.removeStorageSync('token')
				uni.navigateTo({
					url:'../../login/login'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F4F4;
	}
.list{
	width: 90%;
	margin: 0 auto;
	margin-top: 10px;
}
.text{
	font-size: 12px;
	color: #8F8F8F;
	margin: 12px 0 10px 3px;
}
.uni-list-item{
	height: 50px;
}
.logout{
	margin-top: 20px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	color: #d84400;
	background-color: #fff;
	border-radius: 5px;
	text-align: center;
	font-weight: 500;
	font-size: 16px;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
uni-button:after{
	border: none;
}
</style>
