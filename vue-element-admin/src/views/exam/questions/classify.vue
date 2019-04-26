<template>
    <div>
        <p class="title">试题分类</p>
        <Classify class="box" />
    </div>
</template>

<script>
    import Classify from '@/components/questions/classify.vue'
    export default {
        components:{
            Classify
        }
    }
</script>

<style lang="scss" scoped>
    .box{
        display: block;
        width: 100%;
        background: #fff;
        border-radius: 20px;
        padding: 25px 20px 25px 20px;
        box-sizing: border-box;
    }
    .title{
        font-size: 22px;
    }
</style>