<template>
	<view>
		<uni-list>
			<uni-list-item :show-extra-icon="true" showArrow title="头像" :clickable="true" @click="viewAvatar()">
				<template v-slot:footer>
					<img class="slot-image" :src="userInfo.avatar ? getAvatar(userInfo.avatar) :avatarUrl" mode="aspectFill"></img>
				</template>
			</uni-list-item>
			<uni-list-item title="手机号码" :rightText="userInfo.phone" />
			<uni-list-item showArrow title="昵称" :rightText="userInfo.username" :clickable="true" @click="viewMess()"/>
			<uni-list-item showArrow title="性别" :rightText="userInfo.sex" :clickable="true" @click="viewMess()" />
			<uni-list-item showArrow title="邮箱" :rightText="userInfo.email" :clickable="true" @click="viewMess()" />
			<uni-list-item showArrow title="个人简介" :rightText="userInfo.desc" :clickable="true" @click="viewMess()" />
		</uni-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				avatarUrl: '/static/logo.png',
				userInfo:{}
			}
		},
		onShow() {
			try{
				this.userInfo = uni.getStorageSync('userInfo')
			}catch(e){
				console.log('获取缓存失败',e)
			}			
		},
		methods: {
			getAvatar(URL){
				let resUrl = String(URL).replace(/\\\\/g,'/')
				return resUrl
			},
			viewAvatar(){
				uni.navigateTo({
					url:'./components/updateImg'
				})
			},
			viewMess(){
				uni.navigateTo({
					url:'./components/updateMess'
				})
			}
		}
	}
</script>

<style lang="scss">
.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 5px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
	/deep/.uni-list-item__container:first-child{
		padding-left: 7px;
	}
</style>
