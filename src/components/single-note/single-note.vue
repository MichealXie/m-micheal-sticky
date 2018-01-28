<template>
	<div class="single-note">
		<div class="wrapper">
			<div class="top">
				<div class="time">{{date}}</div>
				<div class="close" @click="deleteNote(note.id)">
					<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-close"></use> </svg>
				</div>
			</div>
			<div class="content">
				{{note.content}}
			</div>
			<div class="rank">
				<svg class="icon" aria-hidden="true" v-for="star in 5" ref="star"> <use xlink:href="#icon-star"></use> </svg>
			</div>
			<div class="state" :class="{shadow: note.state === false}" @click="toggleState()">
				<transition name="fade">
					<div class="not-done" v-if="!note.state"><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-correct"></use> </svg></div>
				</transition>
				<transition name="fade">				
					<div class="done" v-if="note.state"> 已完成</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props: {
		note: Object,
	},
	computed: {
		date(){
			let time = new Date(this.note.date)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let day = time.getDate()
			if(month < 10) month = '0' + month
			if(day < 10) day = '0' + day			
			return `${year}年${month}月${day}日`
		}
	},
	methods: {
		async deleteNote(id){
			// 删除的话, 可以先在本地删除再发请求
			this.$emit('deleteSuccess', id)
			await this.$http.delete(`https://sticky-note-b6d2c.firebaseio.com/notes/${id}.json/`)
		},
		async toggleState(){
			this.note.state = !this.note.state
			this.$http.patch(`https://sticky-note-b6d2c.firebaseio.com/notes/${this.note.id}.json`, this.note)
		},
		setStar(){
			for(let i = 0; i < this.note.rank;i++){
				this.$refs.star[i].classList.add('star')
			}
		}
	},
	mounted () {
		this.setStar()
	}
}
</script>

<style lang="stylus" scoped>
  @import '../../static/css/var'
  @import '../../static/css/mixin'

	.single-note
		position absolute
		width 50%
		box-sizing border-box
		&:nth-child(odd)
			padding 1em 1em 0 1em
		&:nth-child(even)
			padding 1em 1em 0 0
		.wrapper
			background: #FFFFFF
			border: 1px solid #E6E6E6
			border-radius: 4px
			padding 1em
			.top
				display flex
				align-items center 
				justify-content space-between
				height 36px
				border-1px()
				.time
					font-size: 14px
					color: #808080
				.close
					color: #D8D8D8
					font-size 14px
					cursor pointer
			.content
				font-size: 16px
				color: #4D4D4D
				padding 14px 0
				line-height 1.5
				border-1px()
			.rank
				color #DBDBDB
				.icon
					padding 16px 4px
					cursor pointer
				.star
					color $blue
			.state
				border-radius 100px
				overflow hidden
				height 24px
				width 58px
				color white
				cursor pointer
				&.shadow
					shadow()
				.done
					height 100%
					width 100%
					font-size 12px
					background-color $blue
					flex-center()
				.not-done
					height 100%
					width 100%
					flex-center()
					background-color $green

</style>
