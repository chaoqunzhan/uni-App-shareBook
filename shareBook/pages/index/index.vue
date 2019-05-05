<template>
	<view class="box">
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
				  <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
				  <input type="text" class="weui-search-bar__input" placeholder="请输入查询内容" :value="inputdefault" @input="onKeyInput"/>
				  <view class="weui-icon-clear" wx:if="SearchData.value.length > 0" @click="SearchClear">
					<icon type="clear" size="14"></icon>
				  </view>
				</view>
			</view>
			<view class="weui-search-bar__cancel-btn" @click="SearchConfirm">
				 <text wx:if="SearchData.value.length>0" data-key='search'>搜索</text>
				 <text wx:else data-key='back'>返回</text>
			</view>
		</view>
		<view class="content">
			<view class="bonner">
				<swiper class="swiper" :indicator-dots=true :autoplay=true :interval=5000 :duration=500>
					<swiper-item>
						<img src="@/static/image/bonner/wxBg.jpg" alt="wxBg" >
					</swiper-item>
					<swiper-item>
						<img src="@/static/image/bonner/qqBg.jpg" alt="qqBg">
					</swiper-item>
					<swiper-item>
						<img src="@/static/image/bonner/weiboBg.jpg" alt="weiboBg">
					</swiper-item>
				</swiper>
			</view>
			<view class="item-mune">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/shu_1.png" alt=""><p>课本</p>
                </navigator>
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/IT.png" alt=""><p>IT</p>
				</navigator>
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/zihangche.png" alt=""><p>自行车</p>
				</navigator>
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/qita.png" alt=""><p>其他</p>
				</navigator>
			</view>
			<view class="new-list">
				<view class="list-left">
					<view class="card">
						<img src="../../static/image/sample/sample5.jpg" alt="" style="width:100%;height:+"imgHeight"+upx" @load="onImageLoad">
						<view class="card-text">这是第一张图片</view>
					</view>
					<view class="card">
						<img src="../../static/image/sample/sample4.jpg" alt="">
						<view class="card-text">这是第san张图片</br>nihao</view>
					</view>
				</view>
				<view class="list-right">
					<view class="card">
						<img src="../../static/image/sample/sample4.jpg" alt="">
						<view class="card-text">这是第二张图片</br>nihao</br>nihao</view>
					</view>
				</view>
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
				inputdefault:'',
				SearchData:{
					value:'nihao '
				},
				cardImg:"width:100%;height:100upx",
				imgHeight:100
			}
		},
		onLoad() {
			// console.log(this.onImageLoad.detail)
			// this.startcreatview()
		},
		methods: {
			SearchClear(){
				this.inputdefault="";
			},
			SearchConfirm(){
				console.log("搜索："+this.SearchData.value);
			},
			onKeyInput: function(event) {
				this.SearchData.value = event.target.value
			},
			
			onImageLoad: function(e){
				// let imageId = e.currentTarget.id;
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height; //图片原始高度
				console.log("image:"+oImgW);
				this.cardImg="width:100%;height:200upx"
			}
		}
	}
</script>

<style>
.box {
	text-align: center;
	/* background:#278909; */
}
	
.weui-search-bar {
	position: fixed;
	top:0;
	z-index:1;
	width:100%;
	padding: 8px 10px;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
	background-color: #39cffc;
	/* border-top: 1rpx solid #d7d6dc;
	border-bottom: 1rpx solid #d7d6dc; */
}
.weui-icon-search {
	margin-right: 8px;
	font-size: inherit;
}

.weui-icon-search_in-box {
	position: absolute;
	left: 10px;
	top: 7px;
}
.weui-search-bar__form {
	position: relative;
	-webkit-box-flex: 1;
	-webkit-flex: auto;
	flex: auto;
	border-radius: 5px;
	background: #fff;
	border: 1rpx solid #e6e6ea;
}
.weui-search-bar__box {
	position: relative;
	padding-left: 30px;
	padding-right: 30px;
	width: 100%;
	box-sizing: border-box;
	z-index: 1;
}

.weui-search-bar__input {
	height: 28px;
	line-height: 28px;
	font-size: 14px;
}

.weui-icon-clear {
	position: absolute;
	top: 0;
	right: 0;
	padding: 7px 8px;
	font-size: 0;
}
.weui-search-bar__label {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2;
	border-radius: 3px;
	text-align: center;
	color: #9b9b9b;
	background: #fff;
	line-height: 28px;
}

.weui-search-bar__cancel-btn {
	margin-left: 10px;
	line-height: 28px;
	color: #fff;
	white-space: nowrap;
}

.content{
	width:100%;
	height:2400upx;
}

.bonner{
	padding-top:150upx;
	width:100%;
	height:250upx;
	background-image:url('~@/static/image/bonner/bonnerBg.jpg');
	background-size:100% 100%;
}

.swiper{
	width:720upx;
	border-radius:10upx;
	height:240upx;
	/* border:1px solid #789; */
	margin:0 auto;
	box-shadow:0px 5px 10px  #c0c0c0;
}

.swiper img{
	width:100%;
	height:100%;
}

.item-mune{
	width:100%;
	padding-top:30upx;
	padding-bottom:30upx;
	background-color:#f0f0f0;
	display:flex;
	flex-direction: row;
}

.item-mune navigator{
	width:150upx;
	margin:0 auto;
	/* background:#890; */
	display: flex;
	flex-direction: column;
	box-shadow:0px 0px 10px 1px #C0C0C0;
	border-radius:20upx;
}

.item-mune navigator img{
	width:80upx;
	height:80upx;
	margin:0 auto;
	/* box-shadow:-5px 50px 50px 2px #C0C0C0; */
}
.item-mune navigator p{
	font-size:24upx;
	margin:0 auto;
}

.new-list{
	display: flex;
	flex-direction: row;
	justify-content:space-around;
}

.list-left,.list-right{
	width:345upx;
	display:flex;
	flex-direction: column;
}

.card{
	width:100%;
	border-radius:10upx;
	border:1px solid #289;
	display:flex;
	flex-direction: column;
	justify-content:flex-start;
}

.card img{
	width:100%;
}


</style>
