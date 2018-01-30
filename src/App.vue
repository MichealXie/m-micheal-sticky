<template>
	<div id="app">
		<app-header></app-header>
		<app-main v-on:showDelete="showDelete()" ref="app-main"></app-main>	
		<div class="goup" @click="goup()"> <svg class="icon" aria-hidden="true"> <use xlink:href="#icon-up"></use> </svg> </div>
		<div class="add" @click="openNewNote()"> <svg class="icon" aria-hidden="true"> <use xlink:href="#icon-plus"></use> </svg> </div>
		<transition name="fade">		
			<div class="delete" v-show="isDeleteShow">删除成功</div>
		</transition>
		<transition name="fade">		
			<div class="success" v-show="isSuccessShow">创建成功</div>
		</transition>
		<transition name="fade">
			<new-note v-show="isNewNoteShow" v-on:closeNewNote="closeNewNote"></new-note>
		</transition>
	</div>
</template>

<script>
import appHeader from '@/components/app-header/app-header.vue'
import appMain from '@/components/app-main/app-main.vue'
import newNote from '@/components/new-note/new-note.vue'

export default{
	components: {
		'app-header': appHeader,
		'app-main': appMain,
		'new-note': newNote
	},
	data () {
		return {
			isNewNoteShow: false,
			isSuccessShow: false,
			isDeleteShow: false
		}
	},
	methods: {
		goup(){
			this.$refs['app-main'].$el.scrollTop = 0
		},
		openNewNote(){
			this.isNewNoteShow = true
		},
		closeNewNote(state){
			this.isNewNoteShow = false
			if(state) this.postSuccess()
		},
		postSuccess(){
			this.isSuccessShow = true
			setTimeout( () => {
				this.isSuccessShow = false
			}, 1000)
		},
		showDelete(){
			this.isDeleteShow = true
			setTimeout( () => {
				this.isDeleteShow = false
			}, 1000)
		}
	},
	created () {
		window.addEventListener('keypress', (e) => {
      if(e.key === 'n' && e.ctrlKey){
        this.isNewNoteShow = true
			}
		})
	}
}
</script>

<style lang="stylus">
	@import './static/css/reset.styl'
  @import '../../static/css/var'
  @import '../../static/css/mixin'
	
	body
		height 100vh
		#app
			height 100%
			margin 0 auto
			font-size 16px
			.icon
				width: 16px; height: 16px;
				vertical-align: -0.15em;
				fill: currentColor;
				overflow: hidden;
			.goup, .add, .delete, .success
				position fixed 
				flex-center()
				shadow()
				font-size 2em
			.goup
				bottom 108px
				right 30px
				background-color white
				color $green
				height 45px
				width 45px
				border-radius 50%
				cursor pointer
			.add
				bottom 30px		
				right 30px	
				height 45px
				width 45px
				color white
				border-radius 50%
				background-color $green
				cursor pointer
			.delete
				top 80px		
				middleX()
				height 55px
				width 215px
				font-size 20px
				background-color white
				color $green
				border-radius: 100px
			.success
				top 80px		
				middleX()
				height 55px
				width 215px
				font-size 20px
				background-color $green
				color white
				border-radius: 100px
		.fade-enter-active, .fade-leave-active
			transition: opacity .5s
		.fade-enter, .fade-leave-to 
			opacity: 0
		@keyframes spin
			0%{
				transform: rotate(0deg)
			} 
			100% {
				transform: rotate(359deg)
			}

</style>
