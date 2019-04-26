<template>
    <div>
        <p class="title">添加试题</p>
        <div class="box">
            <Addque/>
        </div>
    </div>
</template>

<script>
    import Addque from '@/components/questions/addque.vue'
    export default {
        components:{
            Addque
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