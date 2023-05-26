<template>
	<view>
		<view class="avatar">
			<img :src="getAvatar(cover)"></img>
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
		  <el-button size="small" type="primary">上传封面</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
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
				cover:''
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
			onSuccess(res){
				// 获取封面链接
				// 传回上一页
				console.log(res)
				this.cover = res.data
				uni.$emit('cover',this.cover)
				uni.navigateBack({
					delta: 1
				});
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
