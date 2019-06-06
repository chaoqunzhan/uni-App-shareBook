<template>
	<view>
		<swiper class="swiper" :indicator-dots=true :autoplay=true :interval=5000 :duration=500>
			<swiper-item>
				<img src="@/static/image/bonner/wxBg.jpg" alt="wxBg" mode="aspectFit">
			</swiper-item>
			<swiper-item>
				<img src="@/static/image/bonner/qqBg.jpg" alt="wxBg" mode="aspectFit">
			</swiper-item>
			<swiper-item>
				<img src="../../static/image/sample/sample10.jpg" alt="wxBg" mode="aspectFit">
			</swiper-item>
		</swiper>
		
		<view class="describe">
			<view class="describe-name-value">
				<view class="describe-name">js高级教程js高级教程js高级教程js高级教程</view>
				<view class="describe-value">￥20</view>
			</view>
			<view class="describe-sort-age">
				<view class="describe-sort">课本</view>
				<view class="describe-age">小于一个月</view>
			</view>
			<view class="describe-address">
				<img src="@/static/image/item-mune/address.png" width="100%" mode="widthFix">
				<view>zheli是地址输入</view>
			</view>
			<view class="describe-text">js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程js高级教程</view>
		</view>
		
		<view class="bottom-bar">
			<img :src="likeImg" width="100%" mode="widthFix" @click="likeClick">
			<view class="bottom-bar-like">收藏</view>
			<img src="@/static/image/share.png" width="100%" mode="widthFix" @click="shareClick">
			<view class="bottom-bar-share">分享</view>
			<view class="bottom-bar-call" @click="callClick">联系卖家</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				likeImg:"../../static/image/like.png"
			}
		},
		onload(){
			
		},
		methods:{
			likeClick: function(){
				this.likeImg == "../../static/image/likeSelected.png"?this.likeImg = "../../static/image/like.png":this.likeImg = "../../static/image/likeSelected.png"
			},
			shareClick: function(){
				console.log("分享")
			},
			callClick: function(){
				console.log("联系")
			}
		}
	}
</script>

<style>
	.swiper{
		width:100%;
		height:600upx;
		background: #f0f0f0;
	}	
	.swiper img{
		width:100%;
		height:100%;
	}
	.describe-name-value{
		width:670upx;
		display: flex;
		flex-direction: row;
		margin:40upx;
		font-size:40upx;
		font-weight:bold;
	}
	.describe-name{
		flex:1;
		overflow: hidden;
		white-space:nowrap;
	}
	.describe-value{
		width:100upx;
		color:red;
		margin-left:10upx;
	}

	.describe-sort-age{
		width:670upx;
		display: flex;
		flex-direction: row;
		margin:40upx;
		font-size:40upx;
	}
	.describe-sort,.describe-age{
		font-size:28upx;
		color:#808080;
		line-height:40upx;
		/* border:1px solid #808080; */
		border-radius:24upx;
		margin-right:30upx;
		padding:0 10upx;
		background:#39CFFC;
		color:#fff;
	}
	.describe-address{
		margin:40upx;
		font-size:28upx;
		color:#808080;
		line-height:50upx;
	/* 	border:1px solid #808080; */
		display: flex;
		flex-direction: row;
	}
	.describe-address img{
		width:50upx;
		margin-right:30upx;
	}
	.describe-text{
		margin:40upx;
		color:#808080;
		font-size:28upx;
	}
	.bottom-bar{
		width:100%;
		height:100upx;
		/* background:#FF0000; */
		/* border-top:1px solid #808080; */
		box-shadow:0 0 5px #808080;
		position:fixed;
		left:0;
		bottom:0;
		display: flex;
		flex-direction: row;
		line-height:100upx;
	}
	.bottom-bar-like,.bottom-bar-share{
		width:135upx;
	}

	.bottom-bar img{
		width:50upx;
		margin:auto 40upx;
	}
	.bottom-bar-call{
		width:300upx;
		text-align:center;
		color:#fff;
		background:#39CFFC;
	}
</style>
