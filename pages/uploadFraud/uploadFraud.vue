<template>
	<view class="app-container">
		<p class="text">举报详情<span>（必填项）</span></p>
		<uni-list>
			<uni-list-item showArrow title="标题" link to="./components/inputTitle" :rightText="fraud.title ===  '' ? '请输入':fraud.title" :clickable="true"/>
			<uni-list-item showArrow title="年龄" link to="./components/inputAge"  :rightText="fraud.age === '' ? '请输入':ageText" :clickable="true"/>
			<uni-list-item showArrow title="金额(元)" link to="./components/inputMoney" :rightText="fraud.money === null ? '请输入':fraud.money" :clickable="true"/>
			<uni-list-item showArrow title="诈骗类型" link to="./components/inputType" :rightText="fraud.type === '' ? '请输入':typeName" :clickable="true"/>			
			<view class="uni-list1">
				<view class="uni-list-cell list-cell">
					<view class="uni-list-cell-left">
						诈骗时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list1">
				<view class="uni-list-cell list-cell">
					<view class="uni-list-cell-left">
						举报地
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
			</view>
			<uni-list-item showArrow title="举报描述" link to="./components/inputDesc" :ellipsis="1" :rightText="fraud.content === '' ? '请输入':fraud.content" :clickable="true"/>
			<!-- 来源：受害者亲身经历
			 作者：username-->
		</uni-list>
		<p class="text">举报内容<span>（选填项）</span></p>
		<uni-list>
			<uni-list-item showArrow title="图片" link to="./components/uploadImg" :rightText="fraud.cover === '' ? '请上传':'已上传'" :clickable="true"/>
		</uni-list>
			
		<button @click="upload()">提交举报</button>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 10;
		} else if (type === 'end') {
			year = year + 10;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				fraud:{
					title:'',
					money:null,
					age:'',
					type:'',
					content: '',
					cover:'',
					province:'',
					stemfrom: '受害者本人亲述',
					author:'',
					timeofcrime:''
				},
				ageText:'',
				typeName:'',
				array: [{name:'河北'},{name: '山西'}, {name:'辽宁'}, {name:'吉林'},
				{name:'黑龙江'},{name: '江苏'}, {name:'浙江'}, {name:'安徽'},
				{name:'福建'},{name: '江西'}, {name:'山东'}, {name:'河南'},
				{name:'湖北'},{name: '湖南'}, {name:'广东'}, {name:'海南'},
				{name:'四川'},{name: '贵州'}, {name:'云南'}, {name:'陕西'},
				{name:'甘肃'},{name: '青海'}, {name:'台湾'}, {name:'内蒙古'},
				{name:'广西'},{name: '西藏'}, {name:'宁夏'}, {name:'新疆'},
				{name:'北京'},{name: '上海'}, {name:'天津'}, {name:'重庆'},
				{name:'香港'},{name: '澳门'}],
				index: 0,
				userInfo:{},
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
		}
		},
		onShow() {
			try{
				this.userInfo = uni.getStorageSync('userInfo')
			}catch(e){
				console.log('获取缓存失败',e)
			}	
			let that = this
			uni.$on('title',function(data){
				that.fraud.title = data
				// console.log('监听到事件来自title：',data)
			})
			uni.$on('money',function(data){
				that.fraud.money = data
			})
			uni.$on('ageText',function(data){
				that.ageText = data
			})
			uni.$on('ageValue',function(data){
				that.fraud.age = data
			})
			uni.$on('typeName',function(data){
				that.typeName = data
			})
			uni.$on('typeValue',function(data){
				that.fraud.type = data
			})
			uni.$on('desc',function(data){
				that.fraud.content = data
			})
			uni.$on('cover',function(data){
				that.fraud.cover = data
			})
		},
		methods: {
			upload(){
				if(!this.fraud.title || !this.fraud.content || !this.fraud.timeofcrime || !this.fraud.money 
				|| !this.fraud.age || !this.fraud.type || !this.fraud.province){
					uni.showToast({
						title:'必填项不能为空',
						icon:"success"
					})
				}else{
					const date = new Date()
					const year = (this.fraud.timeofcrime).slice(0,4)
					this.$sendRequest({
						  url: '/admin/fraud/add',
						  method: 'POST',
						  data:{
							  'title': this.fraud.title,
							  'createTime': `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
							  'stemfrom': this.fraud.stemfrom,
							  'content': this.fraud.content,
							  'author': this.userInfo.username,
							  'cover':this.fraud.cover,
							  'timeofcrime': this.fraud.timeofcrime,
							  'amount': this.fraud.money,
							  'age': this.fraud.age,
							  'type': this.fraud.type,
							  'province': this.fraud.province,
							  'year': year
						  },
						  success: (res) => {
							  if(res.statusCode == 200){
								  uni.showToast({
								  	title:'举报成功',
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
				}
			},
			// 省份选择器
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.fraud.province = this.array[this.index].name
			},
			// 时间选择器
			bindDateChange: function(e) {
				this.date = e.detail.value
				this.fraud.timeofcrime = this.date
			}
		}
	}
</script>

<style lang="less" scoped>
	.text{
		padding: 10px 10px;
		span{
			color: #999999;
		}
	}
	/* 列表 */
	.uni-list1 {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		height: 43px;
		// line-height: 43px;
		display: flex;
		flex-direction: column;
		border: none;
		border-top: 1px solid #F2F2F2;
	}
	.list-cell{
		margin-top: 10px;
	}
	.uni-list-cell {
		height: 19px;
		padding: 12px 15px;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell-left {
	    white-space: nowrap;
		font-size:28rpx;
	}
	.uni-list-cell-db {
		flex: 1;
		text-align: right;
		color: #999999;
		font-size: 12px;
		padding-right: 20px;
	}
	/deep/ .uni-list-item__extra{
		width: 200px;
		overflow: hidden;
	}
	button{
		margin-top: 50px;
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
