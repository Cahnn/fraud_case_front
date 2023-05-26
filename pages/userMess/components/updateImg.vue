<template>
	<view>
		<view class="avatar">
			<img :src="avatar ? getAvatar(avatar) :avatarUrl" mode="aspectFill"></img>
		</view>
		<el-upload
		  class="upload-demo"
		  action="http://localhost:3001/upload/img"
		  name="myfile"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :headers="uploadHeader"
		  :on-success="onSuccess"
		  :file-list="fileList"
		  :show-file-list="false"
		  list-type="picture"
		  :limit="1">
		  <el-button size="small" type="primary">更换头像</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'',
				uploadHeader: {
				   authorization: 'Bearer '+uni.getStorageSync('token')
			    },
				avatarUrl: '/static/logo.png',
				fileList: []
			}
		},
		onLoad() {
			this.avatar = uni.getStorageSync('userInfo').avatar
		},
		methods: {
			getAvatar(URL){
				let resUrl = String(URL).replace(/\\\\/g,'/')
				return resUrl
			},
			onSuccess(res) {
				  let userInfo = uni.getStorageSync('userInfo')
			      this.fileList[0] = res.data
				  this.$sendRequest({
					  url: '/users/update/personal',
					  method:"POST",
					  header:{
					  	authorization:this.uploadHeader.authorization
					  },
					  data:{
						  '_id': userInfo._id,
						  'avatar': this.fileList[0]
					  },
					  success: (res) => {
						  if(res.data.code == 200){
							  // 资料更新成功，重新获取个人信息更新缓存
							  this.$sendRequest({
								  url: '/users/find/' + userInfo._id,
								  method: 'GET',
								  header:{
								  	authorization:this.uploadHeader.authorization
								  },
								  success: (res) => {
									  if(res.statusCode == 200){
										  uni.setStorageSync('userInfo',res.data.result)
										  userInfo = uni.getStorageSync('userInfo')
										  this.avatar = userInfo.avatar
										  console.log("这是什么",res)
									  }
									  console.log("获取个人信息",this.avatar)
								  }
							  })
						  }
					  }
				  })
			    },
			handleRemove(file, fileList) {
				console.log(file, fileList);
			  },
			  handlePreview(file) {
				console.log(file);
			  }
		}
	}
</script>

<style>
.avatar{
	text-align: center;
}
.avatar img{
	display: block;
	width: 200px;
	height: 200px;
	margin: 30px auto;
	border-radius: 5px;
}
.upload-demo{
	text-align: center;
}
.el-button{
	width: 200px;
}
</style>
