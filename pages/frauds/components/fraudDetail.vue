<template>
  <view class="content">
    <view class="banner" auto-focus>
      <img class="banner-img" :src="getAvatar(banner.cover)"  mode="aspectFill"></img>
      <view class="title-area">
        <text class="title-text">{{banner.title}}</text>
      </view>
    </view>
    <view class="article-meta">
      <text class="article-meta-text article-author">{{banner.stemfrom}}</text>
      <text class="article-meta-text article-text">发表于</text>
      <text class="article-meta-text article-time">{{banner.createTime}}</text>
    </view>
    <view class="article-content">
      <rich-text :nodes="banner.content" style="font-size: 14px;"></rich-text>
    </view>
    <view class="comment-wrap"></view>
	<!-- 上传骗局按钮 -->
	<view class="upload" @click="upload()">
		<p class="p1">我要曝光</p>
		<p class="p2">如果你有相似经历，请点击</p>
	</view>
  </view>
</template>

<script>
  import htmlParser from '../../../common/html-parser'

  const FAIL_CONTENT = '<p>获取信息失败1</p>';

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
        banner: {},
        content: []
      }
    },
    onShareAppMessage() {
      return {
        title: this.banner.title,
        path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
      }
    },
	onLoad(option) {
		console.log(option)
		this.id = option._id
		this.$sendRequest({
		  url: '/admin/fraud/findOne',
		  method:"GET",
		  data:{
			  _id:this.id
		  },
		  success: (res) => {
			  if(res.data.code == 200){
				  this.banner = res.data.result
				  console.log(res)
			  }
		  }
		})
		// this.load(option.query)
	},
    // onLoad(event) {
    //   // 目前在某些平台参数会被主动 decode，暂时这样处理。

    //   this.load(event.query);
    // },
    methods: {
		getAvatar(URL){
			let resUrl = String(URL).replace(/\\\\/g,'/')
			return resUrl
		},
		upload(){
			uni.navigateTo({
				url:'../../uploadFraud/uploadFraud'
			})
		}
      // load(e) {
      //   var p = decodeURIComponent(e);
      //   try {
      //     this.banner = JSON.parse(p);
      //   } catch (error) {
      //     this.banner = JSON.parse(p);
      //   }

      //   uni.setNavigationBarTitle({
      //     title: this.banner.title
      //   });
      // }
    }
  }
</script>

<style>
  /* #ifndef APP-PLUS */
  page {
    min-height: 100%;
  }

  /* #endif */
  
  .content{
	  position: relative;
  }

  .banner {
    height: 180px;
    position: relative;
    background-color: #ccc;
    flex-direction: row;
    overflow: hidden;
  }

  .banner-img {
    flex: 1;
	width: 100%;
	height: 180px;
  }

  .title-area {
	  height: 30px;
	  line-height: 30px;
	  background-color: rgba(0, 0, 0, .3);
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 11;
	padding-left: 10px;
  }

  .title-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    lines: 2;
    color: #ffffff;
    overflow: hidden;
  }

  .article-meta {
    padding: 10px 15px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .article-meta-text {
    color: gray;
  }

  .article-text {
    font-size: 12px;
    line-height: 25px;
    margin: 0 10px;
  }

  .article-author {
    font-size: 15px;
  }

  .article-time {
    font-size: 15px;
  }

  .article-content {
    font-size: 15px;
    padding: 0 15px 70px;
    overflow: hidden;
  }
  
  

  /* #ifdef H5 */

  .article-content {
    line-height: 1.8;
  }

  .article-content img {
    max-width: 100%;
  }
  
	.upload{
		background-color: #2F85FC;
		color: #ffffff;
		text-align: center;
		width: 100%;
		height: 60px;
		position: fixed;
		bottom: 0;
	}
	.p1{
		font-weight: bold;
		margin: 8px 0 4px 0;
	}
	.p2{
		font-size: 12px;
	}
  /* #endif */
</style>
