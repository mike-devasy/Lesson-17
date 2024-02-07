<template>
<v-sheet v-if="userPermissions.write" width="800" class="mx-auto pt-10">
            <v-form fast-fail @submit.prevent>
							<v-text-field  v-model="note.title" label="Title" >
							</v-text-field>
							<v-text-field v-model.number="note.price" label="Price" type="number">
							</v-text-field>
							<v-text-field v-model="note.imgSrc" label="Image">
							</v-text-field>
							<v-text-field v-model="note.link" label="Link" >
							</v-text-field>
							<v-btn class="mr-10"  @click="onNoteAction">{{ buttonTitle }}</v-btn>
							<v-btn @click="onCancel">Відміна</v-btn>
						</v-form>
        </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
	export default {
		name:'EditNoteView',
		data(){
			return{
				note:{},
				noteCopy:null
			}
		},
		computed: {
			...mapGetters('users', ['userPermissions']),   
			 ...mapGetters('notebooks', ['getItemById']),
        receivedNoteId() {
            return this.$route.params.id
        },
        buttonTitle() {
            return this.receivedNoteId ? 'Save' : 'Add note'
        },
		},
		created() {
        this.note = { ...this.getItemById(this.receivedNoteId) }
    },
		methods: {
			...mapActions('notebooks', ['addItem', 'updateItem']),
			onNoteAction() {
            if (!this.receivedNoteId) this.addItem(this.note)
						else  {
           this.noteCopy = this.getItemById(this.receivedNoteId)
                const data = {}
								// this.note = { ...note }
                //  this.noteCopy = note

                if (this.note.title !== this.noteCopy.title) data.title = this.note.title
                if (this.note.price !== this.noteCopy.price) data.price = this.note.price
                if (this.note.imgSrc !== this.noteCopy.imgSrc) data.imgSrc = this.note.imgSrc
                if (this.note.link !== this.noteCopy.link) data.link = this.note.link


                this.updateItem({
                    itemId: this.receivedNoteId,
                    data,
                })
								this.note = {}
            }
						this.$router.push({ name: 'home' })
        },
				onCancel(){
				this.$router.push({ name: 'home' })
				}
		},
	}
</script>

<style lang="scss" scoped>

</style>