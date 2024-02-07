<template>
    <div v-if="isLoading">Loading ....</div>
    <div v-else-if="hasError">Error</div>
    <template v-else>
        <div class="container-notes">
            <div v-for="note in filteredItems" :key="note.id" class="card">
                <a class="image" :href="note.link">
                    <img :src="note.imgSrc" alt="nout" />
                </a>
                <div >
                    <p class="title">{{ note.title }}</p>
                    <p class="discount-price">
                        Ваша економія <span>{{ note.discount }}₴</span>
                    </p>
                    <p class="old-price">{{ note.oldPrice }}₴</p>
                    <div class="price-line">
                        <span class="price">{{ note.price }}₴</span>
                        <v-btn class="text-indigo"
												>Купити</v-btn>
                    </div>
                    <v-sheet class="mt-8 d-flex" style="gap: 10px;justify-self:flex-end;">
											<v-btn v-if="userPermissions.delete"  class="bg-indigo"   @click="onDelete(note.id)">Видалити</v-btn>
											<v-btn v-if="userPermissions.update"    class="bg-indigo"  @click="onEdit(note.id)">Редагувати</v-btn>
											<v-btn  v-if="userPermissions.write"  class="bg-indigo " ><router-link class="button-add"  :to="{name:'config'}">Додати</router-link></v-btn>
										</v-sheet>
                </div>
            </div>
        </div>
    </template>

    <hr />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'NotebooksList',
    props: {
        selectedSellers: {
            type: Array,
            default: () => [],
        },
        selectedBrands: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        ...mapGetters('notebooks', ['getItemsList', 'isLoading', 'hasError']),
        ...mapGetters('users', ['userPermissions']),
        filteredItems() {
            if (this.selectedSellers.length === 0 && this.selectedBrands.length === 0) {
                // Якщо не вибрано жодного продавця, поверніть весь список товарів.
                return this.getItemsList
            } else {
                return this.getItemsList.filter(
                    (note) => this.selectedSellers.includes(note.seller) || this.selectedBrands.includes(note.brand)
                )
            }
        },
    },
    created() {
        this.loadList()
    },
    methods: {
        ...mapActions('notebooks', ['loadList', 'addItem', 'deleteItem', 'updateItem']),
        onEdit(noteId) {
            this.$router.push({
                name: 'config',
                params: {
                    id: noteId,
                },
            })
        },
				onDelete(noteId) {
        if (this.userPermissions.delete) {
            if (confirm("Are you sure you want to delete this item?")) {
                this.deleteItem(noteId);
            }
        } else {
            console.error("You don't have permission to delete this item.");
        }
    }
    },
}
</script>

<style lang="scss" scoped>
.container-notes {
    display: flex;
		align-items: center;
    justify-content: space-between;
    gap: 45px;
    flex-wrap: wrap;
}
.image {
	  align-self: center;
    width: 200px;
    height: 200px;
}
.image img {
    width: 100%;
}
 
.title {
    font-size: 20px;
}
.discount-price {
    text-align: left;
}
.discount-price span,
.price {
    color: red;
}
.old-price {
    text-align: left;
    text-decoration: line-through;
}

.price-line {
    display: flex;
    justify-content: space-between;
    text-align: left;
}
 
.button-add{
	color:white;
	text-decoration: none;
}
.price {
    font-size: 28px;
    font-weight: 500;
}
.card {
    width: 350px;
    display: flex;
    flex-direction: column;
}
</style>
