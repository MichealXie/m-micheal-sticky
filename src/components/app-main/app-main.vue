<template>
	<div class="app-main">
		<div class="main">
			<transition-group name="fade">
				<single-note v-for="note in rankedNotes" :note="note" :key="note.date" ref="single-note" v-on:deleteSuccess="deleteSuccess"></single-note>
			</transition-group>
		</div>
	</div>
</template>

<script>
import singleNote from '@/components/single-note/single-note.vue'
import { bus } from '../../main.js'

export default{
	components: {
		'single-note': singleNote
	},
	data () {
		return {
			notes: [],
			topArr: [168, 168],
			leftArr : [0,0],
			state: 'all',
			rank: null,
		}
	},
	computed: {
		notesArr(){
			// 因为数据库返回的不是数组, 手动转换一下
			let ret = []
			for( let i in this.notes){
				ret.push(this.notes[i])
			}
			return ret
		},
		filteredNotes(){
			if(this.state === 'all'){
				return this.notesArr
			}
			return this.notesArr.filter( (note) => {
				return note.state === this.state
			})
		},
		rankedNotes(){
			if(!this.rank) return this.filteredNotes
			else{
				return this.filteredNotes.filter( (note) => {
					return note.rank === this.rank
				})
			}
		}
	},
	methods: {
		async getNotes(){
			let data = await this.$http.get('https://sticky-note-b6d2c.firebaseio.com/notes.json')
			// 添加 id 方便 delete
			for(let item in data.data){
				data.data[item].id = item
			}
			this.notes = data.data
			this.$nextTick( () => {
				this.waterfall()
			})
		},
		waterfall(){
			this.topArr = [168, 168]
			this.leftArr = [0,0]
			for(let note of this.$refs['single-note']){
				let minTop = Math.min(...this.topArr)
				let minTopIndex = this.topArr.indexOf(minTop)
				note.$el.style.top = this.topArr[minTopIndex] + 'px'
				this.topArr[minTopIndex] += parseInt(getComputedStyle(note.$el).height)
				note.$el.style.left = minTopIndex * parseInt(getComputedStyle(note.$el).width) + 'px'
				this.leftArr[minTopIndex] += parseInt(getComputedStyle(note.$el).width)
			}
		},
		deleteSuccess(id){
			this.$delete(this.notes, id)
			this.$emit('showDelete')
			this.$nextTick( () => {
				this.waterfall()
			})
		}
	},
	created () {
		this.getNotes()
		// post 成功后本地 notes 添加一个选项!
		bus.$on('postSuccess', (note) => {
			this.$set(this.notes, note.id, note)
			this.$nextTick( () => {
				this.waterfall()
			})
		})
		// 监听note 的 state
		bus.$on('changeNotes', (state) => {
			this.state =state
			this.$nextTick( () => {
				this.waterfall()
			})
		})
		// 监听 sort
		bus.$on('selectRank', (rank) => {
			this.rank = rank
			this.$nextTick( () => {
				this.waterfall()
			})
		})
		// 自动瀑布流
		window.onresize = () => {
			this.waterfall()
		}
	}
}
</script>

<style lang="stylus" scoped>
  @import '../../static/css/var'
  @import '../../static/css/mixin'

	.app-main
		overflow scroll 
		background-color #F5F5F5
		width 100%
		height 100vh
		.main
			position relative
			width 100%
			margin 0 auto
			height 100%
			padding-top 85px
</style>
