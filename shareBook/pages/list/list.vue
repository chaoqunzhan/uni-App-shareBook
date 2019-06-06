<template>
	<view class="list-page">
		<navigator url="../../pages/detail/detail?id=1">
			<view class="list">
				<img mode="aspectFill" src="../../static/image/sample/sample1.jpg" class="list-image">
				<view class="list-des">
					<view class="list-des-title">书名书名书名书名书名书名书名书名书名书名</view>
					<view class="list-des-value">价格</view>
					<view class="list-des-date-detail">
						<view class="list-des-date">2019-06-25</view>				
						<view class="list-des-detail">详情</view>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
</script>

<style>
.list-page{
	width:750upx;
	background:#f0f0f0;
	height:100%;
}
.list{
	width:710upx;
	height:200upx;
	margin:20upx;
	background:#fff;
	display:flex;
	flex-direction: row;
	border-radius:5upx;
}
.list-image{
	width:250upx;
	height:200upx;
	margin-right:20upx;
}

.list-des{
	flex:1;
	height:200upx;
	padding-right:20upx;
	display: flex;
	flex-direction: column;
}

.list-des-title{
	width:100%;
	height:90upx;
	line-height:45upx;
	font-size:40upx;
	font-weight:bold;
	margin-bottom:5upx;
}

.list-des-value{
	width:100%;
	height:50upx;
	line-height:50upx;
	font-size:35upx;
	color:#808080;
	margin-bottom:5upx;
}

.list-des-date-detail{
	width:100%;
	height:50upx;
	font-size:35upx;
	display:flex;
	flex-direction: row;
}
.list-des-date{
	width:100%;
	height:50upx;
	color:#808080;
	line-height:50upx;
}
.list-des-detail{
	width:100upx;
	height:50upx;
	line-height:50upx;
	color:#fff;
	background:#39CFFC;
	border-radius:4upx;
	padding:0 3upx;
}

</style>
