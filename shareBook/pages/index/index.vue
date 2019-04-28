<template>
	<view class="box">
		<view class="content">
			<view>
				
			</view>
		</view>
		<share-nav-bar></share-nav-bar>
	</view>
</template>



<script>
	import shareNavBar from "../../components/share-nav-bar.vue"

	export default {
		components: {shareNavBar},
		data() {
			return {
				title: 'buxing shareBook'
			}
		},
		onLoad() {

		},
		methods: {

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
