<template>
    <div>
        <p class="title">查看试题</p>
        <Checkitem />
    </div>
</template>

<script>
    import Checkitem from '@/components/questions/Checkitem.vue'
    export default {
        components: {
            Checkitem
        }
    }
</script>

<style lang="scss" scoped>
    .title{
        font-size: 22px;
    }
</style>