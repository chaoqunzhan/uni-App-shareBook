<template>
	<view>
		<view class="me">
			<view class="me-photo">
				<!-- 登录授权 -->
				<view class="auth" v-show="authShow">
					<button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="event1">点我登录</button>
				</view>
				<img class="me-avatar" :src="info.avatarUrl">
			</view>
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


	export default {

		data() {
			return {
				title: 'buxing shareBook',
				authShow:true,
				info:{
					avatarUrl:"",
					nickName:"",
					gender:"",
					city:""
				}
				//avaterUrl:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqY9MziaXicgpicqtLB6kKGYNE2LcffQ2jEvXmtgQsHsCtzpcEK7OxvFZWOLhnErL5rb5eiafd402DMnA/132"
			}
		},
		
		onLoad() {
			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
			var that = this;
			wx.getSetting({
			  success(res) {
				if (res.authSetting['scope.userInfo']) {
				    that.authShow = false;
					 // 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function(res) {
							console.log(res.userInfo)
							that.info = res.userInfo;
						}
					})
				}else{
					that.authShow = true;
				}
			  }
			})
			
			wx.login({
				success (res) {
					if (res.code) {
					  //发起网络请求
						wx.request({
							url: 'http://192.168.1.154:3000/goodsUser',
							data: {
							  code: res.code
							}
						})
					  console.log("chengong"+res.code)
					} else {
					  console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		methods: {
			// authClick:function(){
			// 	console.log("getIfno")
			// 	wx.authorize({
			// 	scope: 'scope.userInfo',
			// 	success () {
			// 	  // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
			// 	  wx.getUserInfo()
			// 	}
			//   })
			// },
			authReject:function(){
				console.log("reject");
				this.authShow = false;
			},
			event1:function(e) {
				console.log("为啥没有");
				// console.log(e.detail.errMsg)
				// console.log(e.detail.userInfo)
				// console.log(e.detail.rawData)
			}
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
	over-flow:hidden;
}
.auth button{
	/* font-size:20upx; */
	line-height:75upx;
	width:150upx;
	height:150upx;
	border-radius:75upx;
}
.me-avatar{
	posotion:relatve;
	width:150upx;
	height:150upx;border-radius:75upx;
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
