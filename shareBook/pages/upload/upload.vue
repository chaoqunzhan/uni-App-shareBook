<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-list">
				<view class="uni-list-sort">
					<view class="uni-list-sort-left">
						物品分类
					</view>
					<view class="uni-list-middle">|</view>
					<view class="uni-list-sort-db">
						<picker name="sort" @change="bindPickerSort" :value="sortDefault" :range="sortArray">
							<view class="uni-input">{{sortArray[sortDefault]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-left">
						物品年龄
					</view>
					<view class="uni-list-middle">|</view>
					<view class="uni-list-sort-db">
						<picker name="age" @change="bindPickerAge" :value="ageDefault" :range="ageArray">
							<view class="uni-input">{{ageArray[ageDefault]}}</view>
						</picker>
					</view>
				</view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-left">物品名称</view>
					<view class="uni-list-middle">|</view>
					<input name="title" class="uni-list-sort-db" maxlength="20" placeholder="(必填)最长输入为20" />
				</view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-left">期望价格</view>
					<view class="uni-list-middle">|</view>
					<input name="value" class="uni-list-sort-db" type="number" placeholder="单位:元" />
				</view>
				<view class="list-guodu"></view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-left"><img src="@/static/image/item-mune/phone.png" width="100%" mode="widthFix"></view>
					<view class="uni-list-middle">:</view>
					<input name="phone" class="uni-list-sort-db" type="number" placeholder="(必填)联系电话" />
				</view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-left"><img src="@/static/image/item-mune/address.png" width="100%" mode="widthFix"></view>
					<view class="uni-list-middle">:</view>
					<input name="address" class="uni-list-sort-db" type="number" placeholder="地址" />
				</view>
				<view class="list-guodu"></view>
				
				<view class="uni-list-sort">
					<view class="uni-list-sort-db">
						<textarea name="describe" placeholder-style="color:#808080" placeholder="(少于200字)输入物品描述,并上传照片"/>
					</view>
				</view>
				
				<view class="list-photo">
					<img src="@/static/image/item-mune/photo.png" width="100%" mode="widthFix">
				</view>
				
				<button class="list-button" form-type="submit">点击提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'buxing shareBook',
				formData:{
					title:"",
				},
				sortArray:["课本","IT","自行车","其他"],
				sortDefault:0,
				ageArray:["小于一个月","小于六个月","小于一年","小于三年","其他"],
				ageDefault:0
			}
		},
		onLoad() {

		},
		methods: {
			bindPickerSort: function(e) {
				this.sortDefault = e.target.value;
				this.formData.sort = this.sortArray[e.target.value]
			},
			bindPickerAge: function(e) {
				this.ageDefault = e.target.value;
				this.formData.age = this.ageArray[e.target.value]
				console.log('picker发送选择改变，携带值为', this.formData)
			},
			formSubmit: function(e){
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				
				uni.request({				//上传表单
					url: 'http://192.168.1.154:3000/goodsUpload', //接口地址。
					data: {
						good:JSON.stringify(e.detail.value),
					},
					header: {
						'content-type':'application/json'//自定义请求头信息
					},
					method:"POST",
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

<style>
	.uni-list{
		width:100%;
		display:flex;
		flex-direction:column;
	}

	.uni-list-middle{
		margin:30upx 0;
		color:#e0e0e0;
		/* width:1upx; */
		/* border:1px solid #808080; */
	}

	.list-guodu{
		width:100%;
		height:30upx;
		background:#e0e0e0;
	}


	.uni-list-sort{
		width:100%;
		border-bottom:1px solid #e0e0e0;
		display:flex;
		flex-direction:row;	
	}

	.uni-list-sort-left{
		/* border-right:1px dotted #808080; */
		margin:30upx;
	}

	.uni-list-sort-db{
		margin:30upx;
	}

	.uni-list-sort-left img{
		width:50upx;
	}

	.list-photo img{
		width:250upx;
	}

	.list-photo{
		margin:0 auto;
	}

	.list-button{
		color:#fff;
		background:#39CFFC;
		margin-top:30upx;
		width:680upx;
	}



</style>
