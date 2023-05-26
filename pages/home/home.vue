<template>
	<view class="content">
		<view class="block">
		    <el-carousel height="200px">
		      <el-carousel-item v-for="(item,index) in acticities" :key="index" @click.native="acDetail(item._id)">
		        <img class="img" :src="getAvatar(item.cover)" mode="aspectFill"></img>
		      </el-carousel-item>
		    </el-carousel>
		</view>
		
		<view class="middle-container">
			<view class="box" @click="aq()">
				<view>
					<image src="/static/icons/aq.png" mode=""></image>
				</view>
				<view class="box-text">反诈问答</view>
			</view>
			<view class="box" @click="upload()">
				<view>
					<image src="/static/icons/baoguang.png" mode=""></image>
				</view>
				<view class="box-text">我要曝光</view>
			</view>
		</view>
		
		<view class="newsBox">
			<view class="text">最新动态</view>
			<view class="news">
				<view class="new" v-for="item in news" @click="fraudDetail(item._id)">
					<view class="MessBox">
						<view class="title">{{item.title}}</view>
						<view class="time">{{item.stemfrom}}&nbsp;&nbsp;&nbsp;{{getTime(item.createTime)}}</view>
					</view>
					<view class="imgBox">
						<img :src="item.cover"></img>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :icon-size="14" :content-text="contentText" v-if="news.length > 0" />
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				acticities:[],
				news: [],
				ifBottomRefresh: false,  // 是否触底
				// reload: false,
				params:{
					pageno:1,    // 页码
					pageSize:5		// 页面条数
				},
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore:'已经没有啦~'
				},
				totalCount: 1
			}
		},
		mounted() {
			// 获取活动列表
			this.$sendRequest({
			  url: '/admin/activity/findAll',
			  method:"GET",
			  success: (res) => {
				  if(res.data.code == 200){
					  this.acticities = res.data.result
				  }
			  }
			})
			this.getNews()			
		},
		onReachBottom() {
			if (this.status != 'noMore') {
				this.status = 'loading';
				this.ifBottomRefresh = true
				this.getNews()
			} else {
				this.status ="noMore"
			}
		},
		methods: {
			getTime(time){
				let res = String(time).split(' ')[0]
				return res
			},
			getAvatar(URL){
				let resUrl = String(URL).replace(/\\\\/g,'/')
				return resUrl
			},
			acDetail(id){
				console.log(id)
				uni.navigateTo({
					url:'./components/acDetail?_id='+id
				})
			},
			fraudDetail(id){
				uni.navigateTo({
					url:'../frauds/components/fraudDetail?_id='+id
				})
			},
			aq(){
				uni.navigateTo({
					url:'./components/aq'
				})
			},
			upload(){
				uni.navigateTo({
					url: '../uploadFraud/uploadFraud'
				});
			},
			getNews(){
				// 获取最新动态（前10条数据）
				this.$sendRequest({
				  url: '/admin/fraud/findAll',
				  method:"GET",
				  data:{
					page:this.params.pageno,
					size: this.params.pageSize
				  },
				  success: (res) => {
					  if(res.data.code == 200){
						  // 接口请求成功后，判断加载状态，处理数据
						  if(2 >= this.params.pageno){
							  if(this.ifBottomRefresh){
								  this.news = this.news.concat(res.data.result)   // 合并数组
							  }else{
								  this.news = res.data.result
							  }
						  }else{
							  this.status = 'noMore'
						  }
						  
						  if(this.params.pageno >= 2){
							  this.status = 'noMore'
						  }
						  this.params.pageno++					  
					  }
				  }
				})
			}
		
		}
	}
</script>

<style lang="less" scope>
	page{
		background-color: #f8f8f8;
	}
	.content{
		width: 95%;
		margin: 0 auto;
	}
	.el-carousel{
		margin-top: 5px;
		border-radius: 10px;
	}
	.img{
		width: 100%;
		height: 200px;
	}
	.text{
		margin-top: 10px;
		font-size: 18px;
		font-weight: bolder;
	}
	
	.middle-container{
		display: flex;
		height: 100px;
		width: 100%;
		justify-content: space-between;
		margin-top: 20px;
		.box{	
			border-radius: 10px;
			border: 1px solid #ffffff;
			background-color: #ffffff;
			width: 48%;
			display: flex;
			justify-content: center;
			align-items: center;
			.box-text{
				margin-left: 10px;
				font-size: 18px;
				font-weight: bolder;
			}
			image{
				width: 50px;
				height: 50px;
			}
		}
	}
	
	.news{
		margin-top: 10px;
	}
	.new{
		padding: 10px 15px;
		display: flex;
		height: 80px;
		background-color: #ffffff;
		border-radius: 5px;
		margin: 1px auto;
	}
	.MessBox{
		flex: 1;
	}
	.imgBox{
		width: 35%;
	}
	img{
		width: 112px;
		height: 73px;
		margin-top: 5px;
	}
	.title{
		padding: 0 5px 8px 0;
		font-size: 15px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.time{
		margin-top: 10px;
		font-size: 12px;
		color: #999999;
	}
</style>