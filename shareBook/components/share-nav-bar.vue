<template name="share-nav-bar">
    <view>
        <view class="nav-body">
            <view class="nav-btn">
                <navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
                    <button type="default">主页</button>
                </navigator>
				<navigator url="redirect/redirect?title=redirect" redirect hover-class="other-navigator-hover">
				    <button type="default">发布</button>
				</navigator>
                <navigator url="redirect/redirect?title=redirect" redirect hover-class="other-navigator-hover">
                    <button type="default">我的</button>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>

</script>

<style>
.nav-btn{
	bottom:0;
	display:flex;
	flex-direction: row;
}

.nav-btn navigator{
	flex-grow: 1;
}
</style>
