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
		
		<scroll-view class="content" v-bind:style="{height:contentH+'px'}" scroll-y="true" @scrolltolower="loadMore" lower-threshold="100">
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
<!-- 				<img :src="preLoadImg" alt="" mode="widthFix" width="100%" @load="preImageLoad" v-show="false"> -->
				<view class="list-left">
					<view class="card" v-for="(item,index) in cardListLeft">
						<img :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
				</view>
				<view class="list-right">
					<view class="card" v-for="(item,index) in cardListRight" >
						<img :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
					value:'nihao'
				},
				
				allcardList:[{
					cardImg:"../../static/image/sample/sample1.jpg",
					cardTitle:"我是第一张图片",
					cardText:"来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},{
					cardImg:"../../static/image/sample/sample4.jpg",
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
				cardListLeft:[],
				cardListRight:[],
				cardLeftHeight:0,
				cardRightHeight:0,
				cardListItem:0,
				rImgH:0,
				preLoadImg:"",
				
				contentH:1000
			}
		},
		
		onLoad() {
			this.waterfall();
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
			
			// preImageLoad:function(pre){
			// 	let divWidth = 345;
			// 	let oImgW = pre.detail.width; //图片原始宽度
			// 	let oImgH = pre.detail.height; //图片原始高度
			// 	this.rImgH = divWidth*oImgH/oImgW+212;
			// },
			
			onImageLoad: function(e){

				let divWidth = 345;
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height; //图片原始高度
				let rImgH = divWidth*oImgH/oImgW+170;
				if(this.cardListItem==0){
					this.cardLeftHeight += rImgH;	//第一张图高度加到cardLeftHeight
					this.cardListItem++;			//图片索引加1
					this.cardListRight.push(this.cardList[this.cardListItem]);	//添加第二张图到cardListRight数组
				}else{
					this.cardListItem++;		//图片索引加1
						if(this.cardLeftHeight > this.cardRightHeight){
							this.cardRightHeight += rImgH;		//第二张图高度加到cardRightHeight
						}else{
							this.cardLeftHeight += rImgH;
						}
						
					if(this.cardListItem<this.cardList.length){	
						if(this.cardLeftHeight > this.cardRightHeight){
							this.cardListRight.push(this.cardList[this.cardListItem]);		//添加第三张图到cardListRight数组
						}else{
							this.cardListLeft.push(this.cardList[this.cardListItem]);
						}
					}
				}
				
				console.log(this.cardListItem);
				if(this.cardListItem%4 == 0){
					console.log("rightHeight:"+this.cardRightHeight);
					console.log("leftHeight:"+this.cardLeftHeight);
					var contentHupx;
					this.cardLeftHeight > this.cardRightHeight ? contentHupx = this.cardLeftHeight : contentHupx = this.cardRightHeight;
					this.contentH = uni.upx2px(contentHupx+40);
					console.log(this.contentH);
				}
				
				
			},
			
			waterfall: function(){
				this.cardList = this.allcardList.slice(0,4);		//初始化图片显示
				this.cardListLeft.push(this.cardList[0]);
				this.preLoadImg = this.cardList[0].cardImg;
			},
			
			loadMore: function(){
				console.log("loadMore");
				// console.log(this.cardList);
				let newcardList = this.allcardList.slice(this.cardListItem,this.cardListItem+4);
				// console.log(newcardList);
				this.cardList = this.cardList.concat(newcardList);
				console.log(this.cardList);
				if(this.cardLeftHeight > this.cardRightHeight){
					this.cardListRight.push(newcardList[0]);
				}else{
					this.cardListLeft.push(newcardList[0]);
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
	margin-bottom:30upx;
}

.card img{
	width:100%;
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

</style>
