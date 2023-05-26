<template>
	<view>
		<view class="uni-px-5">
			<uni-data-checkbox mode="tag" v-model="radio" :localdata="age"></uni-data-checkbox>
		</view>
		<button @click="goBack()">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 0,
				age: [{
					text: '18岁以下',
					value: 1
				},
				{
					text: '18-35岁',
					value: 2
				}, 
				{
					text: '36-45岁',
					value: 3
				}, 
				{
					text: '46-60岁',
					value: 4
				}, 
				{
					text: '61岁以上',
					value: 5
				}],
			}
		},
		methods: {
			goBack(){
				uni.$emit('ageText',this.age[this.radio-1].text)
				uni.$emit('ageValue',this.radio)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}
	.uni-px-5 {
	    padding: 10px 10px;
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
