<template>
	<view class="app-container">
		<div class="title">
			<span>忘记密码</span>
		</div>
	 
		<div class="title-msg">
			<span>请输入登录手机号和密保问题答案</span>
		</div>
	 
		<form class="login-form" method="post" novalidate>
			<!--输入框-->
			<div class="input-content">
				<!--autoFocus-->
				<div>
					<input type="number" autocomplete="off" placeholder="手机号" maxlength="11" name="phone" v-model="phone" required/>
				</div>
	 
				<div style="margin-top: 16px">
					<input type="text" autocomplete="off" placeholder="你最喜欢的电影？" name="answer" v-model="answer" required maxlength="15"/>
				</div>
			</div>
	 
			<!--提交按钮-->
			<div style="text-align: center">
				<button type="submit" class="enter-btn" @click="submit">提交</button>
			</div>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				answer: ''
			}
		},
		methods: {
			submit(){
				if(this.phone == '' || this.answer == ''){
					uni.showToast({
						icon:"error",
						title:'手机号或答案为空'
					})
				}else{
					// 根据手机号查询该手机号是否存在
					// 把所有用户信息查询出来，对比输入的答案和该用户的密保问题答案是否相同
					this.$sendRequest({
					  url: '/admin/users/findByPhone',
					  method:"GET",
					  data:{
						  phone:this.phone
					  },
					  success: (res) => {
						  if(res.data.code == 200){
							  if(res.data.result.problem.answer === this.answer){
								  // 去设置新密码
								  uni.navigateTo({
									url:'./setNewPwd?_id='+res.data.result._id
								  })
							  }else{
								  uni.showToast({
									icon:"error",
									title:'答案不正确'
								  })
							  }
						  }else{
							  uni.showToast({
								icon:"error",
								title:'该手机号不存在'
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
        line-height: 80px;
		margin-top: 30px;
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
        width: 100%;
        height: 40px;
        border: 1px solid #dad9d6;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
    }
 
    .enter-btn {
        width: 100%;
        height: 40px;
        color: #fff;
        background: #0bc5de;
        line-height: 40px;
        text-align: center;
        border: 0px;
		margin-left: -1px;
		margin-top: 30px;
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
    .right{
        float: right;
		margin-right: 20px;
    }
</style>
