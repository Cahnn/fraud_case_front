<template>
	<view>
		<p style="font-size: 20px;margin: 100px 0 10px 20px;">{{problem.question}}</p>
		<view class="input">
			<input type="text" v-model="problem.answer"  @input="changeDisabled" maxlength="15" placeholder="请输入您的答案">
		</view>
		<button class="confirm" :disabled="disabled" @click="confirm()">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				disabled: false,
				problem:{
					question:'你最喜欢的电影？',
					answer: '',
				}
			}
		},
		onLoad() {
			this.getStorageUser()
		},
		methods: {
			getStorageUser(){
				try{
					this.userInfo = uni.getStorageSync('userInfo')
					this.problem = this.userInfo.problem
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
				// 或许再加一个旧答案的input，旧答案正确才可以更换新答案
				this.$sendRequest({
				  url: '/admin/users/setProblem',
				  method:"POST",
				  data: {
					  _id: this.userInfo._id,   
					  problem:this.problem
				  },
				  success: (res) => {
					  if(res.data.code == 200){
						  // 资料更新成功
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
					  }else{
						  uni.showToast({
							title:'系统出现问题，请稍后重试或联系管理员',
							icon:"error"
						  })
					  }
				  }
				})
			}
		}
	}
</script>

<style lang="less">
.input{
	display: flex;
	margin: 50px 20px 0;
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
