<template>
	<view>
		<textarea value="" placeholder="请输入标题" maxlength="20" focus="true" v-model="txt"></textarea>
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
				uni.$emit('title',this.txt)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	textarea{
		height: 100px;
		padding: 15px;
		width: 100%;
	}
	button{
		width: 90%;
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
