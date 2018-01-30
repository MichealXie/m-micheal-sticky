<template>
	<div class="app-header">
		<div class="header">
			<div class="btn show-menu" @click.stop="toggleMenu()">
				状态<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-down"></use> </svg>
				<div class="menu" v-show="isMenuShow">
					<span class="item" :class="{active: state === 'all'}" @click="changeNotes('all')">全部</span>
					<span class="item" :class="{active: state === false}" @click="changeNotes(false)">未完成</span>
					<span class="item" :class="{active: state === true}" @click="changeNotes(true)">已完成</span>
				</div>
			</div>
			<div class="info">
				<span class="creator">Micheal</span>
				<span class="product">在线便签</span>
			</div>
			<div class="btn show-rank" @click.stop="toggleRank()">
				星级<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-down"></use> </svg>
				<div class="rank" v-show="isRankShow">
					<span class="item" :class="{active: rank === null}" @click="selectRank(null)">全部</span>
					<span class="item" :class="{active: rank === index}" v-for="index in 5" @click="selectRank(index)">{{index}}</span>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
import { bus } from '../../main.js'

export default{
	data () {
		return {
			state: 'all',
			rank: null,
			isMenuShow: false,
			isRankShow: false,
		}
	},
	methods: {
		changeNotes(state){
			this.state = state
			this.isMenuShow = false
			bus.$emit('changeNotes', state)
		},
		selectRank(rank){
			this.rank = rank
			bus.$emit('selectRank', rank)
		},
		toggleMenu(){
			this.isMenuShow = !this.isMenuShow
		},
		toggleRank(){
			this.isRankShow = !this.isRankShow
		}
	}
}
</script>

<style lang="stylus" scoped>
  @import '../../static/css/var'
  @import '../../static/css/mixin'

	.app-header
		position fixed 
		top 0
		width 100%
		height 64px
		border-radius: 4px
		font-size 18px
		background-color white
		z-index 100
		border-1px()
		.header
			display flex
			align-items center
			height 64px
			width 100%
			margin 0 auto
			.info
				color: $green
				flex 1
				display flex
				align-items center 
				flex-direction column
				.creator
					font-size: 32px
					font-weight bold
				.product
					font-size: 24px
			.btn
				position relative
				flex 1
				flex-center()
				text-align center
				color $green
				.menu, .rank
					position absolute
					top 150%
					width 125px
					display flex
					flex-direction column
					justify-content flex-start
					border: 1px solid #E6E6E6
					shadow()
					background-color white
					padding 1em
					box-sizing border-box
					color #666666
					border-radius: 4px
					.item
						border-1px()
						padding 16px
						transition .3s all
						&.active
							color $green
							font-size 20px
				.menu
					left 10px
				.rank
					right 10px


			


</style>
