<template>
	<view>
		<uni-section title="">
			<uni-card :title="issue.question" :thumbnail="avatar" @click="onClick">
				<text class="uni-body">{{issue.answer}}</text>
			</uni-card>
		</uni-section>
		
		<p class="text">还没有解决您的问题？前往<span @click="goFeedBack()">意见反馈</span>></p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				issue:{},
				avatar: '/static/icons/question.png',
			}
		},
		onLoad(option) {
			this.id = option._id
			this.$sendRequest({
			  url: '/admin/issue/findOne',
			  method:"GET",
			  data:{
			  	_id:this.id
			  },
			  success: (res) => {
				  
				  if(res.data.code == 200){
					  // 接口请求成功后，判断加载状态，处理数据
					  this.issue = res.data.result
					  
				  }
			  }
			})
		},
		methods: {
			onClick(e){
				console.log(e)
			},
			goFeedBack(){
				uni.navigateTo({
					url:'./feedback'
				})
			}
		}
	}
</script>

<style lang="less">
.text{
	text-align: center;
	margin-top: 20px;
	font-size: 14px;
	color: #676A74;
	span{
		color: #6068C6;
	}
}
</style>
