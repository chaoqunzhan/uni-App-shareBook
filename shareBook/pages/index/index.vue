<template>
	<view class="box" >
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
		
		<scroll-view class="content" v-bind:style="{height:contentH+'px'}" scroll-y="true" @scrolltolower="loadMore" lower-threshold="10">
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
				<navigator url="../../pages/list/list?id=1" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/shu_1.png" alt=""><p>课本</p>
                </navigator>
				<navigator url="../../pages/list/list?id=2" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/IT.png" alt=""><p>IT</p>
				</navigator>
				<navigator url="../../pages/list/list?id=3" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/zihangche.png" alt=""><p>自行车</p>
				</navigator>
				<navigator url="../../pages/list/list?id=4" hover-class="navigator-hover">
					<img src="@/static/image/item-mune/qita.png" alt=""><p>其他</p>
				</navigator>
			</view>
			<view class="new-list">
				<view class="list-left">
					<view class="card" v-for="(item,index) in cardListLeft">
						<navigator url="../../pages/detail/detail?id=1" hover-class="navigator-hover">
							<img :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
							<view class="card-text">
								<h2>{{item.cardTitle}}</h2>
								<p>{{item.cardText}}</p>
							</view>
						</navigator>
					</view>
				</view>
				<view class="list-right">
					<view class="card" v-for="(item,index) in cardListRight">
						<navigator url="../../pages/detail/detail?id=1" hover-class="navigator-hover">
							<img :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
							<view class="card-text">
								<h2>{{item.cardTitle}}</h2>
								<p>{{item.cardText}}</p>
							</view>
						</navigator>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="showNoMore" >我也是有底线的！！！</view>
		</scroll-view>
		
		<!-- <view class="noMore" v-if="showNoMore" >我也是有底线的！！！</view> -->
	</view>
</template>



<script>
	export default {
		data() {
			return {
				inputdefault:'',
				SearchData:{
					value:'nihao'
				},
				
				animationData: {},
				allcardList:[{
					cardImg:"../../static/image/sample/sample1.jpg",
					cardTitle:"我是第一张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"https://qiniu.cqz21.top/sample1.jpg",
					cardTitle:"我是第二张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample5.jpg",
					cardTitle:"我是第三张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample2.jpg",
					cardTitle:"我是第四张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample3.jpg",
					cardTitle:"我是第五张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample6.jpg",
					cardTitle:"我是第六张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample7.jpg",
					cardTitle:"我是第七张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample8.jpg",
					cardTitle:"我是第八张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample9.jpg",
					cardTitle:"我是第九张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample10.jpg",
					cardTitle:"我是第十张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample11.jpg",
					cardTitle:"我是第十一张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample12.jpg",
					cardTitle:"我是第十二张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}],
				cardListLeft:[],		//用来储存左栏的card
				cardListRight:[],		//用来储存右栏的card
				cardLeftHeight:0,
				cardRightHeight:0,		//分别是左右栏的高度
				cardListItem:0,			//作为card的ID
				rImgH:0,				//实际载入的card的高度
				contentH:800,			//设置客户端的屏幕高度默认值
				loadMoreTemp:1,			//作为scoll滚动触底，加载更多的标记，防止多次出发事件，1为允许，0为阻止
				showNoMore:false		//控制底部“我也是有底线view的显示”
			}
		},
		
		onLoad() {
			this.waterfall();			//初始化瀑布流
			
			uni.request({
				url: 'http://192.168.1.154:3000/goodsList', //接口地址。
				data: {
					
				},
				header: {
					//自定义请求头信息
				},
				method:"GET",
				success: (res) => {
					console.log(res.data);
				}
			});
			
		},
		onShow: function(){
			var animation = uni.createAnimation({
			  duration: 1000,
				timingFunction: 'ease',
			})

			this.animation = animation

			animation.step()

			this.animationData = animation.export()

			setTimeout(function() {
				// this.animation.translate(-100).step()
				this.animation.opacity(1).step()
				this.animationData = animation.export()
			}.bind(this), 1000)
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

				let divWidth = 345;			//实际显示的单栏宽度，345upx
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height; //图片原始高度
				let rImgH = divWidth*oImgH/oImgW+170;	//重新计算当前载入的card的高度
				
				if(this.cardListItem==0){
					this.cardLeftHeight += rImgH;	//第一张card高度加到cardLeftHeight
					this.cardListItem++;			//card索引加1
					this.cardListRight.push(this.cardList[this.cardListItem])//添加第二张card到cardListRight数组
				}else{
					this.cardListItem++;		//card索引加1
					
						if(this.cardLeftHeight > this.cardRightHeight){		//把card的高度加到目前高度更低的栏中
							this.cardRightHeight += rImgH;		//第二张card高度加到cardRightHeight
						}else{
							this.cardLeftHeight += rImgH;
						}
						
					if(this.cardListItem<this.cardList.length){				//根据目前的栏高，把下一张card，push到低的那栏
						if(this.cardLeftHeight > this.cardRightHeight){
							this.cardListRight.push(this.cardList[this.cardListItem])	//添加第三张card到cardListRight数组
						}else{
							this.cardListLeft.push(this.cardList[this.cardListItem])
						}
					}
				}
				
				// console.log(+this.cardListItem);
				if(this.cardListItem%4 == 0){				//每次载入的card数量设置为4，只有载入完成才允许下一次的scroll触底，触发loadMore
					this.loadMoreTemp = 1;
				}
				
				
			},
			
			waterfall: function(){
				this.cardList = this.allcardList.slice(0,4);		//初始化图片显示
				this.cardListLeft.push(this.cardList[0]);
				this.preLoadImg = this.cardList[0].cardImg;
				var that = this;
				uni.getSystemInfo({		//利用uni-APP获取系统信息Api，获取客户端的屏幕高度，设置成scoll-view的高度，实现触底事件
					success: function (res) {
						that.contentH = res.windowHeight;
					},
				});
			},
			
			loadMore: function(){
				if(this.loadMoreTemp == 1){			//loadMoreTemp==1,才允许触发
					console.log("loadMore");
					this.loadMoreTemp = 0;			//防止多次触发
					
					let newcardList = this.allcardList.slice(this.cardListItem,this.cardListItem+4);//模拟后端接口返回四个新的数据
					
					//console.log(newcardList);
					if(!newcardList.length == 0){				//判断是否还有新数据
						this.cardList = this.cardList.concat(newcardList);			//返回的新数据加到当前的cardList
						if(this.cardLeftHeight > this.cardRightHeight){				//把第一个新数据加到目前更低的栏上，以触发@load="onImageLoad"
							this.cardListRight.push(newcardList[0]);			
						}else{
							this.cardListLeft.push(newcardList[0]);
						}
					}else{
						this.showNoMore = true;				//没有新数据就显示到底了
					}
					
					
				}
				
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
	/* display:inline; */
	/* height:2400upx; */
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
	/* box-shadow:0px 0px 10px 1px #C0C0C0; */
	border-radius:20upx;
}

.item-mune navigator img{
	width:60upx;
	height:60upx;
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
	/* border:1upx solid #fff; */
	box-shadow:0px 0px 5px 2px #C0C0C0;
	display:flex;
	flex-direction: column;
	justify-content:flex-start;
	margin-bottom:30upx;
}


.card img{
	width:100%;
	border-top-left-radius:10upx;
	border-top-right-radius:10upx;
}

.card-text h2{
	width:100%;
	line-height:40upx;
	height:40upx;
	font-size:35upx;
	text-align:left;
	margin:10upx;
	text-overflow:ellipsis;
	overflow:hidden;
	white-space:nowrap;
}

.card-text p{
	font-size:25upx;
	height:60upx;
	line-height:30upx;
	text-align:left;
	color:#808080;
	margin:10upx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.noMore{
	width:100%;
	background:#f0f0f0;
	font-size:24upx;
	color:#808080;
}

</style>
