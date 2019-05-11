<template>
	<view>
		<view class="me">
			<view class="me-photo"></view>
			<view class="me-title">
				<view class="me-title-name">小提群</view>
				<view class="me-title-tag">
					<img src="@/static/image/boy.png" width="100%" mode="widthFix">男
					<img src="@/static/image/address.png" width="100%" mode="widthFix">北京
				</view>
			</view>
		</view>
		
		<view class="all">
			<view class="all-upload-collection">
				<view class="all-upload-collection-num">12</view>
				<view class="all-upload-collection-tag">发布</view>
			</view>
			<view class="all-upload-collection">
				<view class="all-upload-collection-num">23</view>
				<view class="all-upload-collection-tag">收藏</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-upload">
				<img src="@/static/image/爱心.png" width="100%" mode="widthFix">
				<view class="list-upload-kong">我的收藏</view>
				<view class="list-upload-to"><img src="@/static/image/箭头.png" width="100%" mode="widthFix"></view>
			</view>
			<view class="list-upload">
				<img src="@/static/image/上传.png" width="100%" mode="widthFix">
				<view class="list-upload-kong">我的发布</view>
				<view class="list-upload-to"><img src="@/static/image/箭头.png" width="100%" mode="widthFix"></view>
			</view>
			<view class="list-upload">
				<img src="@/static/image/消息.png" width="100%" mode="widthFix">
				<view class="list-upload-kong">系统消息</view>
				<view class="list-upload-to"><img src="@/static/image/箭头.png" width="100%" mode="widthFix"></view>
			</view>
			<view class="list-upload">
				<img src="@/static/image/通知.png" width="100%" mode="widthFix">
				<view class="list-upload-kong">系统通知</view>
				<view class="list-upload-to"><img src="@/static/image/箭头.png" width="100%" mode="widthFix"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import shareNavBar from "../../components/share-nav-bar.vue"

	export default {
		components: {shareNavBar},
		data() {
			return {
				title: 'buxing shareBook'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
.me{
	width:100%;
	height:350upx;
	background:#39CFFC;
	display: flex;
	flex-direction: row;
}
.me-photo{
	width:150upx;
	height:150upx;
	border-radius:75upx;
	margin:40upx;
	border:1px solid #fff;
}
.me-title{
	flex:1;
	margin:40upx;
	height:150upx;
	/* border:1px solid #fff; */
	display:flex;
	flex-direction: column;
}
.me-title-name{
	width:100%;
	height:100upx;
	/* border:1px solid #fff; */
	font-size:50upx;
	line-height:100upx;
	color:#fff;
	font-weight:bold;
}
.me-title-tag{
	width:100%;
	height:50upx;
	/* border:1px solid #fff; */
	/* line-height:50upx; */
	font-size:28upx;
	color:#808080;
}
.me-title-tag img{
	width:30upx;
	margin-right:5upx;
}

.me-title-tag img:nth-child(2){
	margin-left:30upx;
}

.all{
	width:670upx;
	margin:-100upx 40upx 0 40upx;
	height:200upx;
	background:#fff;
	/* border:1px solid #808080; */
	border-radius:30upx;
	display: flex;
	flex-direction: row;
}
.all-upload-collection{
	width:335upx;
	display:flex;
	flex-direction: column;
	padding:20upx;
}
.all-upload-collection-num{
	font-size:60upx;
	font-weight:bold;
	margin:0 auto;
}
.all-upload-collection-tag{
	font-size:30upx;
	margin:0 auto;
}

.list{
	margin:40upx;
	width:670upx;
	display:flex;
	flex-direction: column;
	/* border:1px solid #808080; */
}
.list-upload{
	width:100%;
	/* height:80upx; */
	display:flex;
	flex-direction: row;
	margin-top:20upx;
	/* border:1px solid #808080; */
}
.list-upload img{
	width:60upx;
}
.list-upload-to{
	width:60upx;
}
.list-upload-kong{
	flex:1;
	color:#808080;
	margin-left:20upx;
}

</style>
