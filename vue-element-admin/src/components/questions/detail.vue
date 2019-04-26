<template>
    <div class="box">
        <div class="left">
            <p class="title">出题人:<span>{{list.user_name}}</span></p>
            <p>题目信息</p>
            <div class="title_list">
                <span>{{list.questions_type_text}}</span>
                <span>{{list.subject_text}}</span>
                <span>{{list.exam_name}}</span>
            </div>
            <pre>{{list.title}}</pre>
            <textarea 
                id="text-input" 
                oninput="this.editor.update()"
                rows="6" 
                cols="60"
            >
            {{list.questions_stem}}
            </textarea>
        </div>
        <div class="right">
            <p>答案信息</p>
            <textarea 
            id="text-inputs" 
            oninput="this.editor.update()"
            rows="6" 
            cols="60"
        >
        {{list.questions_answer}}
        </textarea>
        </div>
    </div>
</template>
<script>
    var markdown = require( "markdown" ).markdown;
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                questions_id: '',
                list: {}
            }
        },
        computed: {
            ...mapState({
                questions_item: state => state.exam.questions
            })
        },
        async created() {
            await this.questions();
            this.questions_id = JSON.parse(sessionStorage.getItem('questions_ids'));
            if (this.questions_id) {
                await this.questions();
                this.questions_item.forEach(item => {
                    if (item.questions_id == this.questions_id) {
                        this.list = item;
                    }
                })
            }
        },
        methods: {
            ...mapActions({
                questions: 'exam/questions'
            })
        }
    }
</script>

<style lang="scss" scoped>
    * {
        list-style: none;
    }

    .box {
        width: 100%;
        display: flex;
        .left {
            width: 70%;
            background: #fff;
            margin-right: 1.5%;
            box-sizing: border-box;
            border-radius: 10px;
            padding: 2%;

            .title_list {
                display: flex;
                box-sizing: border-box;
            }
        }

        .right {
            width: 30%;
            background: #fff;
            border-radius: 10px;
            padding: 2%;
            box-sizing: border-box;
        }
    }

    .title_list {
        span {
            padding: 5px 8px;
            font-size: 12px;
        }

        span:nth-child(1) {
            border: 1px solid #9DDAFF;
            background: #E6F7FF;
            color: #1890FF;
        }

        span:nth-child(2) {
            border: 1px solid #ADC6FF;
            margin-left: 7px;
            background: #F0F5FF;
            color: #2F54EC;
        }

        span:nth-child(3) {
            border: 1px solid #FFD591;
            margin-left: 7px;
            background: #FFF7E6;
            color: #FA8C16;
        }
    }

    .left_msg {
        max-height: 500px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .right_msg {
        margin-top: 23%;
        max-height: 500px;
        overflow: hidden;
        overflow-y: scroll;
    }
    #text-input{
        width: 100%;
        height: 450px;
        border: 0;
        outline: none;
        color: #595959;
        font-size: 14px;
    }
    #text-inputs{
        width: 100%;
        height: 450px;
        border: 0;
        outline: none;
        color: #595959;
        margin-top: 15%;
        font-size: 14px;
    }
    .title{
        font-size: 14px;
        color: #595959;
    }
</style>