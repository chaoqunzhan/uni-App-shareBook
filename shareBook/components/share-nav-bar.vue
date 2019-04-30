<template name="share-nav-bar">
    <view>
        <view class="nav-body">
            <view class="nav-btn">
                <navigator open-type="redirectTo" url="../../pages/index/index" :style="iconColorIndex">
                    <uni-icon type="home" size="30"></uni-icon><div>主页</div>
                </navigator>
				<navigator open-type="redirectTo" url="../../pages/upload/upload" :style="iconColorUpload">
				    <uni-icon type="plus" size="30"></uni-icon><div>发布</div>
				</navigator> 
                <navigator open-type="reLaunch" url="../../pages/home/home" :style="iconColorHome">
                    <uni-icon type="contact" size="30"></uni-icon><div>我的</div>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
import uniIcon from "@/components/uni-icon/uni-icon.vue";
export default {
    components: {uniIcon},
	data(){
		return{

		}	
	},
	methods:{

	}
}
</script>

<style>
.nav-btn{
	bottom:0;
	display:flex;
	flex-direction: row;
	background:#fff;
}

.nav-btn navigator{
	flex-grow: 1;
	/* color: #535DE9; */
}

.uni-icon{
	/* color:#535DE9; */
}

/* .nav-hover{
	color:#007AFF;
} */

share-nav-bar{
	text-align: center;
	position:fixed;
	width:100%;
	bottom:0;
	left:0
}

</style>
