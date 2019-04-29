<template name="share-nav-bar">
    <view>
        <view class="nav-body">
            <view class="nav-btn">
                <navigator url="navigate/navigate?title=navigate" hover-class="nav-hover">
                    <uni-icon type="home" size="30"></uni-icon><div>主页</div>
                </navigator>
				<navigator url="redirect/redirect?title=redirect" hover-class="nav-hover">
				    <uni-icon type="plus" size="30"></uni-icon><div>发布</div>
				</navigator>
                <navigator url="redirect/redirect?title=redirect" hover-class="nav-hover">
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
			iconColor:'#535DE9'
		}
		
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

.nav-hover{
	color:#007AFF;
}
</style>
