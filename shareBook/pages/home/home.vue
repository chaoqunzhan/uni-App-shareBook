<template>
	<view>
		<view class="me">
			<view class="me-photo">
				<!-- 登录授权 -->
				<view class="auth" v-show="authShow">
					<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">点我登录</button>
				</view>
				<img class="me-avatar" :src="info.avatarUrl">
			</view>
			<view class="me-title">
				<view class="me-title-name">{{info.nickName}}</view>
				<view class="me-title-tag">
					<img :src="info.genderUrl" width="100%" mode="widthFix">{{info.gender}}
					<img src="@/static/image/address.png" width="100%" mode="widthFix">{{info.city}}
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
							var genderRes = that.setGender(that.info.gender);
							that.info.gender = genderRes[0];
							that.info.genderUrl = genderRes[1]; 
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
							},
							success: (res) => {
								console.log("openid:"+res.data.openid);
								//本在储存状态
								uni.setStorage({
									key: 'openid',
									data: res.data.openid,
									success: function () {
										console.log('success');
									}
								});
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
			authReject:function(e){
				console.log("reject");
				this.authShow = false;
			},
			bindGetUserInfo: function(e) {
				console.log("怎么了:"+e.detail.userInfo)
				if (e.detail.userInfo){
					//用户按了允许授权按钮
					this.info = e.detail.userInfo;
					var genderRes = this.setGender(this.info.gender);
					this.info.gender = genderRes[0];
					this.info.genderUrl = genderRes[1]; 
					this.authShow = false;
					uni.showToast({
						title: '完成登录',
						duration: 2000
					});
				} else {
				  //用户按了拒绝按钮
				}
			},
			setGender: function(gender){
				var genderUrl;
				if(gender == 1){
					gender = "男"; 
					genderUrl = "../../static/image/boy.png";
				}else{
					gender = "女"; 
					genderUrl = "../../static/image/girl.png";
				}
				return [gender,genderUrl];
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
