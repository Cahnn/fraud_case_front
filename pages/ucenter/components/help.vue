<template>
	<view>
		<view class="feedback">
			<view class="text">
				<p style="font-size: 16px;font-weight: 600;">意见反馈</p>
				<p style="font-size: 14px;margin-top: 10px;">关于使用应用遇到的问题和改进建议</p>
			</view>
			<button class="btn" @click="goFeedBack()">我要反馈</button>
		</view>
		<view class="question">
			<p>常见问题</p>
			<view class="ques">
				<uni-list>
					<uni-list-item v-for="item in issues" showArrow :title="item.question" @click="goDetail(item._id)" :clickable="true"/>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				issues:[]
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData(){
				this.$sendRequest({
				  url: '/admin/issue/findAll',
				  method:"GET",
				  success: (res) => {
					  if(res.data.code == 200){
						  // 接口请求成功后，判断加载状态，处理数据
						  this.issues = res.data.result
						  
					  }
				  }
				})
			},
			goFeedBack(){
				uni.navigateTo({
					url:'./feedback'
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'./issue?_id='+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #F4F4F4;
	}
.feedback{
	background-color: #6896FD;
	color: #fff;
	height: 120px;
	width: 100%;
	position: relative;
}
.text{
	padding-left: 25px;
	padding-top: 20px;
}
.btn{
	width: 90%;
	background-color: #fff;
	height: 45px;
	position: absolute;
	bottom: -22px;
	left: 5%;
	border-radius: 10px;
	font-size: 16px;
	font-weight: bold;
	color: #606069;
	line-height: 45px;
}
.question{
	margin-top: 30px;
	p{
		padding-left: 20px;
		margin-bottom: 10px;
		font-weight: 600;
	}
}
.ques{
	background-color: #fff;
	width: 90%;
	margin: 0 auto;
}
</style>
