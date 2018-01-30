<template>
	<div class="new-note">
		<div class="header">
			<div class="close" @click="close()">取消</div>
			<div class="title">新建便签</div>
			<div class="post"  @click="postNote()">
				<span v-show="!isPosting" >完成</span>
				<svg v-show="isPosting"  class="icon" aria-hidden="true"> <use xlink:href="#icon-loading"></use> </svg>
			</div>
		</div>
		<div class="body">
			<div class="rank">
				<span class="word">重要星级:</span>
				<div class="stars">
					<svg class="icon" aria-hidden="true" v-for="star in 5" @click="setRank(star)" ref="star"> <use xlink:href="#icon-star"></use> </svg>
				</div>
			</div>
			<textarea class="textarea" placeholder="输入内容" v-model="content" autofocus></textarea>
		</div>
	</div>
</template>

<script>
import { bus } from '../../main.js'

export default {
	data () {
		return {
			content: '',
			rank: 1,
			isPosting: false,
		}
	},
	methods: {
		setRank(index){
			this.rank = index
			for(let i = 0; i < 5;i++){
				this.$refs.star[i].classList.remove('star')
			}
			for(let i = 0; i < index;i++){
				this.$refs.star[i].classList.add('star')
			}
		},
		async postNote(){
			if(this.isPosting) return
			if(!this.content) return
			this.isPosting = true
			let note = {
				content: this.content,
				date: new Date().valueOf(),
				rank: this.rank,
				state: false
			}
			let data = await this.$http.post('https://sticky-note-b6d2c.firebaseio.com/notes.json',note)
			note.id = data.data.name
			// 成功后
			this.$emit('closeNewNote', true)
			// 设置新的 note
			bus.$emit('postSuccess', note)
			// 清空 note
			this.content = ''
			this.rank = 1
			this.isPosting = false
		},
		close(){
			this.$emit('closeNewNote', false)
		},
	},
	mounted () {
		this.$nextTick( () => {
			this.$refs.star[0].classList.add('star')
		})
	},
}
</script>

<style lang="stylus" scoped>
  @import '../../static/css/var'
  @import '../../static/css/mixin'

	.new-note
		position fixed 
		top 0
		left 0
		right 0
		bottom 0
		z-index 200
		.header
			height 64px
			position fixed 
			top 0
			width 100%
			background-color white
			display flex
			align-items center
			border: 1px solid #E6E6E6
			.close
				flex 1
				margin-left 12px
				color $green
				cursor pointer
				flex-center()
			.title
				flex 3
				height 64px
				flex-center()
				font-size: 18px
				color: #666666
			.post
				flex 1
				flex-center()
				margin-right 12px
				background-color $green
				color white
				height 27px
				width 42px
				border-radius: 100px
				.icon
					font-size 2.5em
					animation spin 2s infinite linear
		.body
			padding 64px 10px 0 10px
			background-color #F5F5F5
			height calc( 100vh - 64px)
			.rank
				display flex
				align-items center 
				padding 1em 0
				color #333
				border: 1px solid #E6E6E6
				.stars
					display flex
					justify-content flex-end
					align-items center
					padding-left 30px
					color #DBDBDB
					.icon
						padding-left 10px
						cursor pointer
					.star
						color $blue
			.textarea
				width 100%
				outline none
				font-size 16px
				padding 10px
				overflow scroll 
				border 0
				height 100%
				background-color #F5F5F5
</style>
