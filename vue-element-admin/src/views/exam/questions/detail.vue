<template>
    <div>
        <p class="title">详情页面</p>
        <Detail class="box" />
    </div>
</template>

<script>
    import Detail from '@/components/questions/detail.vue'
    export default {
        data() {
            return {
            }
        },
        components:{
            Detail
        },
        created() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .title{
        font-size: 22px;
    }
</style>