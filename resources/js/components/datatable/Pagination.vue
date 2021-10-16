<template>
    <div>
        <div>
            <div class="float-left">
                <span>Showing {{ pag.from }} to {{ pag.to }} of {{ pag.total }} entries</span>
            </div>

            <nav aria-label="..." class="float-right" style="cursor: pointer">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: pag.current_page <= 1 }">
                        <a class="page-link" @click.prevent="changePage(1)"  >First page</a>
                    </li>
                    <li class="page-item" :class="{ disabled: pag.current_page <= 1 }">
                        <a class="page-link" @click.prevent="changePage(pag.current_page - 1)">Previous</a>
                    </li>

                    <li class="page-item" v-for="page in pages"  :key="page" :class="isCurrentPage(page) ? 'active' : ''">
                        <a class="page-link" @click.prevent="changePage(page)">{{ page }}
                            <span v-if="isCurrentPage(page)" class="sr-only">(current)</span>
                        </a>
                    </li>

                    <li class="page-item" :class="{ disabled: pag.current_page >= pag.last_page }">
                        <a class="page-link" @click.prevent="changePage(pag.current_page + 1)">Next</a>
                    </li>
                    <li class="page-item" :class="{ disabled: pag.current_page >= pag.last_page }">
                        <a class="page-link" @click.prevent="changePage(pag.last_page)">Last page</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
  export default{
    props:['pag', 'offset'],

    methods: {
      isCurrentPage(page){
        return this.pag.current_page === page
      },
      changePage(page) {
        if (page > this.pag.last_page) {
          page = this.pag.last_page;
        }
        this.pag.current_page = page;
        this.$emit('paginate');
      }
    },
    computed: {
      pages() {
        let pages = [];
        let from = this.pag.current_page - Math.floor(this.offset / 2)
        if (from < 1) {
          from = 1
        }
        let to = from + this.offset -1;
        if (to > this.pag.last_page) {
          to = this.pag.last_page
        }
        while (from <= to) {
          pages.push(from);
          from++
        }
        return pages
      }
    }
  }
</script>

<style scoped>
</style>
