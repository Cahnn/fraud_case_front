<template>
	<view>
		<view class="banner" auto-focus>
			<img class="banner-img" :src="content.cover"  mode="scaleToFill"></img>
			<view class="title-area">
				<text class="title-text">{{content.title}}</text>
			</view>
		</view>
		<view class="actiContent">
			<rich-text :nodes="content.content" style="font-size: 14px;"></rich-text>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser.js'
	function parseImgs(nodes) {
	  nodes.forEach(node => {
	    if (
	      node.name === 'img' &&
	      node.attrs &&
	      node.attrs['data-img-size-val']
	    ) {
	      const sizes = node.attrs['data-img-size-val'].split(',')
	      const width = uni.upx2px(720 * 0.9)
	      const height = parseInt(width * (sizes[1] / sizes[0]))
	      node.attrs.style = `width:${width};height:${height};`
	    }
	    if (Array.isArray(node.children)) {
	      parseImgs(node.children)
	    }
	  })
	  return nodes
	}
	export default {
		data() {
			return {
				id: '',
				content: {}
			}
		},
		onLoad(option) {
			this.id = option._id
			this.$sendRequest({
			  url: '/admin/activity/findOne',
			  method:"GET",
			  data:{
				  _id:this.id
			  },
			  success: (res) => {
				  if(res.data.code == 200){
					  this.content = res.data.result
					  console.log(res)
				  }
			  }
			})
			this.load()
		},
		mounted() {
		},
		methods: {
			load() {
			  uni.setNavigationBarTitle({
			    title: this.content.title
			  })
			}
		}
	}
</script>

<style scope>
font{
	text-indent: 2em;
	padding: 5px;
}
.banner {
    height: 180px;
    position: relative;
    background-color: #ccc;
    flex-direction: row;
    overflow: hidden;
  }

 .banner-img {
	 height: 200px;
	 width: 100%;
  }

  .title-area {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 15px;
    z-index: 11;
  }

  .title-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    lines: 2;
    color: #ffffff;
    overflow: hidden;
  }
  
  .actiContent {
    font-size: 15px;
    padding: 0 15px;
	margin-top: 10px;
    margin-bottom: 15px;
    overflow: hidden;
  }
  
  /* #ifdef H5 */
  
  .actiContent {
    line-height: 1.8;
  }
  
  .actiContent img {
    max-width: 100%;
  }
  
  /* #endif */
</style>
