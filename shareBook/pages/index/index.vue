<template>
	<view class="box">
		<view class="content">
			<view>
				
			</view>
		</view>
		<!-- <share-nav-bar></share-nav-bar> -->
	</view>
</template>



<script>
	import shareNavBar from "../../components/share-nav-bar.vue"

	export default {
		components: {shareNavBar},
		data() {
			return {
				title: 'buxing shareBook',
				iconColorIndex : "color:#535DE9",
				iconColorUpload : "color:#000",
				iconColorHome : "color:#000"
			}
		},
		onLoad() {
			this.startcreatview()
		},
		methods: {
			startcreatview(){  
			    var s = this;  
			    s.TitleTimer = setTimeout(function() {  
			        s.createView();  
			    }, 100);//具体缓迟时间可以按需设置  
			},  
			createView() {  
                clearTimeout(this.TitleTimer);  
                var s = this;  
                var pages = getCurrentPages();  
                var page = pages[pages.length - 1];  
                var currentWebview = page.$getAppWebview();  
                var nTitle = currentWebview.getTitleNView();  
                    nTitle.draw(  
                        [{  
                                "tag": "rect",  
                                "id": "rect",  
                                "color": "#999",  
                                "position": {  
                                    "left": "50px",  
                                    "right": "50px",  
                                    "top": "7px",  
                                    "bottom": "7px"  
                                },  
                                "rectStyles": {  
                                    "color": "#f6f6f6",  
                                    "radius": "30px",  
                                    "borderColor": "#999"  
                                }  
                            },  
                            {  
                                "tag": "font",  
                                "id": "font",  
                                "text": "\ue466",  
                                "position": {  
                                    "left": "55px",  
                                    "width": "30px",  
                                    "top": "7px",  
                                    "bottom": "7px"  
                                },  
                                "textStyles": {  
                                    "size": "13px",  
                                    "fontSrc": "/static/uni.ttf",  
                                    "color": "#999"  
                                }  
                            },  
                            {  
                                "tag": "input",  
                                "id": "input",  
                                "position": {  
                                    "left": "80px",  
                                    "right": "70px",  
                                    "top": "7px",  
                                    "bottom": "7px"  
                                },  
                                "inputStyles": {  
                                    "placeholder": "关键字搜索",  
                                    "borderRadius": "30px",  
                                    "borderWidth": "0px",  
                                    "fontSize": "13px",  
                                    "type": "search",  
                                    "fontSrc": "/static/uni.ttf",  
                                    "color": "#999",  
                                    onComplete: function(e) {  
                                        console.log('点击搜索执行' + e.text)  
                                    },  
                                    onFocus: function(e) {  
                                        console.log('获得焦点')  
                                    },  
                                    onBlur: function(e) {  
                                        console.log('失去焦点')  
                                    }  
                                }  
                            }  
                        ]  
                    );  
            } 
		}
	}
</script>

<style>
	.box {
		text-align: center;
		background:#278909;
	}
	
	.content{
		width:100%;
		height:1200px;
		background:#298;
	}
	
	share-nav-bar{
		position:fixed;
		width:100%;
		bottom:0;
		left:0
	}
	
</style>
