<template>
	<view>
		<input class="input" value="" type="number" placeholder="请输入金额" maxlength="20" focus="true" v-model="txt"></input>
		<button @click="goBack()">填写完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:''
			}
		},
		methods: {
			goBack(){
				uni.$emit('money',this.txt)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.input{
		height: 100px;	
		padding: 15px;
		width: 90%;
	}
	button{
		width: 90%;
		margin: 0 auto;
		height: 40px;
		line-height: 40px;
		color: #fff;
		background-color: #2F85FC;
		border-radius: 20px;
		text-align: center;
		font-weight: 500;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}
</style>
