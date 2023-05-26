<template>
	<view>
		<p>问题类型(必选)</p>
		<view class="uni-px-5">
			<uni-data-checkbox mode="tag" v-model="radio" :localdata="type"></uni-data-checkbox>
		</view>
		<p>反馈内容（必填）</p>
		<textarea class="content" v-model="feedback.content" maxlength="300" placeholder="请详细描述您的问题(不超过300字)"></textarea>
		<p>图片（选填）</p>
		<el-upload
		  class="upload-demo"
		  action="http://localhost:3001/upload/img"
		  name="myfile"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :headers="uploadHeader"
		  :on-success="onSuccess"
		  :file-list="fileList"
		  list-type="picture"
		  :limit="1">
		  <el-button class="uploadBtn" size="small" type="primary">点击上传</el-button>
		  <span slot="tip" class="el-upload__tip">限制上传1张</span>
		</el-upload>
		<p>联系方式（选填）</p>
		<input class="contactway" v-model="feedback.contactWay" placeholder="请留下您的联系方式,方便我们联系您" type="text">
		
		<button class="submit" @click="submit()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadHeader: {
				   authorization: 'Bearer '+uni.getStorageSync('token')
				},
				fileList: [],
				radio: 0,
				type: [{
					text: '功能异常',
					value: 1
				},
				{
					text: '产品建议',
					value: 2
				}, 
				{
					text: '我要吐槽',
					value: 3
				}, 
				{
					text: '其他问题',
					value: 4
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				feedback:{
					type:'',
					content:'',
					photo:'',
					contactWay:''
				}
			}
		},
		methods: {
			getAvatar(URL){
				let resUrl = String(URL).replace(/\\\\/g,'/')
				return resUrl
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			onSuccess(res) {
				console.log(res)
				this.fileList[0] = res.data
				this.feedback.photo = this.fileList[0]
			},
			submit(){
				this.feedback.type = this.type[this.radio-1].text
				if(!this.feedback.type || !this.feedback.content){
					uni.showToast({
						title:'必填项不能为空',
						icon:"error"
					})
				}else{
					const date = new Date()
					this.$sendRequest({
						  url: '/admin/feedback/add',
						  method: 'POST',
						  data:{
							  'type': this.feedback.type,
							  'createTime': `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
							  'content': this.feedback.content,
							  'photo': this.feedback.photo,
							  'contactWay':this.feedback.contactWay
						  },
						  success: (res) => {
							  if(res.statusCode == 200){
								  uni.showToast({
								  	title:'提交成功',
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
			}
		}
	}
</script>

<style lang="scss">
	.uni-px-5 {
	    padding: 10px 10px;
	}
	p{
		font-weight: 600;
		padding: 10px;
	}
	.content{
		padding: 10px;
	}
	.contactway{
		margin-left: 10px;
	}
	.example-body {
		padding: 10px;
		padding-top: 0;
	}
	.uploadBtn{
		margin: 10px 0 0 10px;
	}
	::v-deep .is-success{
	  width: 300px;
	  margin-left: 10px;
	}
	::v-deep .el-upload-list__item-name {
	  width: 100px;
	}
	.el-upload__tip{
		margin-left: 10px;
	}
	.submit{
		margin-top: 20px;
		width: 90%;
		height: 40px;
		line-height: 40px;
		color: #fff;
		background-color: #2F85FC;
		border-radius: 5px;
		text-align: center;
		font-weight: 500;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		position: fixed;
		bottom: 20px;
		left: 5%;
	}
</style>
