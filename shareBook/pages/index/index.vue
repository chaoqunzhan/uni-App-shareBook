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
						<img src="@/static/image/bonner/wxBg.jpg" alt="wxBg">
					</swiper-item>
					<swiper-item>
						<img src="@/static/image/bonner/qqBg.jpg" alt="qqBg">
					</swiper-item>
					<swiper-item>
						<img src="@/static/image/bonner/weiboBg.jpg" alt="weiboBg">
					</swiper-item>
				</swiper>
			</view>
			<p>sd</p>
			<p>sd</p>
			<p>sd</p>
			<p>sd</p>
			<p>sd</p>
			<p>sd</p>
			<p>sd</p>
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
				}
			}
		},
		onLoad() {
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
			}
		}
	}
</script>

<style>
.box {
	text-align: center;
	background:#278909;
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
	height:1200upx;
	background:#808080;
}

.bonner{
	padding-top:150upx;
	width:100%;
	height:300upx;
	background:#39cffc;
}

.swiper{
	width:710upx;
	border-radius:200upx;
	height:250upx;
	margin:0 auto;
}
	
</style>
