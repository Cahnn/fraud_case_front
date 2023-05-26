<template>
	<view class="app-container">
		<view class="logo">
			<image class="img" src="../../../static/icons/logo.png" mode=""></image>
			<p class="fm">FraudMaster</p>
			<p class="text">诈骗案例分析与统计</p>
		</view>
		<uni-list class="list">
			<uni-list-item title="当前版本号:" rightText="v1.0" :clickable="false"/>
			<uni-list-item showArrow title="服务协议" :clickable="true"/>
			<uni-list-item showArrow title="隐私政策" :clickable="true"/>
			<uni-list-item title="版权所有:" rightText="Fraud Master" :clickable="false"/>
			<uni-list-item title="技术支持:" rightText="@cahnn" :clickable="false"/>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.logo{
	height: 200px;
	color: #fff;
	text-align: center;
	overflow: hidden;
	position: relative;
}
.logo::after{
	content: '';
	    width: 120%;
	    height: 100%;
	    position: absolute;
	    left: -10%;
	    top: 0;
	    z-index: -1;
	    border-radius: 0 0 50% 50%;
	    background: #2F85FC;
}
.img{
	width: 80px;
	height: 80px;
	border-radius: 50px;
	margin-top: 20px;
}
.list{
	margin-top: 20px;
}
.fm{
	font-size: 20px;
	font-weight: bold;
	margin-top: 10px;
}
.text{
	font-size: 14px;
	margin-top: 12px;
}
</style>
