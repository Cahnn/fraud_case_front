<template>
	<view>
		<view class="uni-px-5">
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in category" :key="item.id">
						<view>
							<radio :value="String(item.id)" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<button @click="goBack()">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				category: [],
			}
		},
		created() {
			this.getCategory()
		},
		methods: {
			radioChange: function(evt) {
				console.log(evt)
				for (let i = 0; i <= this.category.length; i++) {
					if (this.category[i].id == evt.detail.value) {
						this.current = i;
						console.log(this.current)
						break;
					}
				}
			},
			getCategory(){
				this.$sendRequest({
				  url: '/admin/category/findAll',
				  method:"GET",
				  success: (res) => {
					  if(res.data.code == 200){
						  this.category = res.data.result
						  console.log(this.category)
					  }
				  }
				})
			},
			goBack(){
				uni.$emit('typeName',this.category[this.current].name)
				uni.$emit('typeValue',this.current+1)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-list-cell{
		display: flex;
		padding: 10px 10px;
	}
	.uni-list{
		padding-bottom: 20px;
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
