<template>
    <div>
        <p>添加试题</p>
        <div class="stem">
            <span class="stem_g">题干</span>
            <input type="text" placeholder="请输入题目标题，不超过20个字" maxlength="20" v-model='sel_id.title'>
        </div>
        <div class="theme">
            <span>题目主题</span>
            <div class="editor-container">
                <markdown-editor v-model="sel_id.questions_stem" height="300px" />
            </div>
        </div>
        <div class="exam_style">
            <span>请选择考试类型:</span>
            <el-select v-model="examTypes" placeholder="请选择" @change='Type($event,"exam")'>
                <el-option v-for="(item,index) in examType" :key="item.exam_id" :label="item.exam_name" :value="item.exam_id">
                </el-option>
            </el-select>
        </div>
        <div class="exam_style">
            <span>请选择课程类型:</span>
            <el-select v-model="value" placeholder="请选择" @change='Type($event,"sub")'>
                <el-option v-for="item in subject" :key="item.subject_id" :label="item.subject_text" :value="item.subject_id">
                </el-option>
            </el-select>
        </div>
        <div class="exam_style">
            <span>请选择题目类型:</span>
            <el-select v-model="coures" placeholder="请选择" @change='Type($event,"topic")'>
                <el-option v-for="item in QuestionsType" :key="item.questions_type_id" :label="item.questions_type_text"
                    :value="item.questions_type_id">
                </el-option>
            </el-select>
        </div>
        <div class="theme">
            <span>答案信息</span>
            <div class="editor-container">
                <markdown-editor v-model="sel_id.questions_answer" height="300px" />
            </div>
        </div>
        <el-button type="text" class="addbtn" @click='submit'>提交</el-button>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'MarkdownDemo',
        components: { MarkdownEditor },
        data() {
            return {
                html: '',
                examTypes: '',
                value: '',
                coures: '',
                questions_id: '',
                sel_id: {
                    exam_id: '',
                    subject_id: '',
                    questions_type_id: '',
                    questions_stem: '',
                    title: '',
                    questions_answer: ''
                }
            }
        },
        computed: {
            ...mapState({
                examType: state => state.exam.examType,
                subject: state => state.exam.subject,
                QuestionsType: state => state.exam.getQuestionsType,
                getusers: state => state.exam.getuser,
                questions_item: state => state.exam.questions
            })
        },
        async created() {
            this.questions_id = JSON.parse(sessionStorage.getItem('questions_id'));
            this.getitem();
            this.subjects();
            this.getQuestionsType();
            this.getuser();
            if (this.questions_id) {
                await this.questions();
                this.questions_item.forEach(item => {
                    if (item.questions_id == this.questions_id) {
                        this.sel_id.title = item.title;
                        this.sel_id.questions_stem = item.questions_stem;
                        this.examTypes = item.exam_name;
                        this.value = item.subject_text;
                        this.coures = item.questions_type_text;
                        this.sel_id.questions_answer = item.questions_answer;
                        this.sel_id.exam_id = item.exam_id;
                        this.sel_id.subject_id = item.subject_id;
                        this.sel_id.questions_type_id = item.questions_type_id;
                    }
                })
            }
        },
        methods: {
            Type(e,type) {
                console.log(e,type)
                this.sel_id.exam_id = e;
                switch (type){
                    case 'exam':
                    this.sel_id.exam_id = e;
                    break;
                    case 'sub':
                    this.sel_id.subject_id = e;
                    break;
                    case 'topic':
                    this.sel_id.questions_type_id = e;
                    break;
                }
            },
            getHtml() {
                this.html = this.$refs.markdownEditor.getHtml()
            },
            ...mapActions({
                additem: 'exam/additems',
                getitem: 'exam/getitems',
                subjects: 'exam/subjects',
                getQuestionsType: 'exam/getQuestionsType',
                getuser: 'exam/getuser',
                update: 'exam/update',
                questions: 'exam/questions'
            }),
            submit(e) {
                if (!this.questions_id) {
                    if (this.sel_id.questions_type_id && this.sel_id.questions_stem && this.sel_id.subject_id && this.sel_id.exam_id && this.sel_id.questions_answer && this.sel_id.title) {
                        this.additem({
                            questions_type_id: this.sel_id.questions_type_id,
                            questions_stem: this.sel_id.questions_stem,
                            subject_id: this.sel_id.subject_id,
                            exam_id: this.sel_id.exam_id,
                            user_id: this.getusers.user_id,
                            questions_answer: this.sel_id.questions_answer,
                            title: this.sel_id.title
                        })
                    } else {
                        alert('请填写所有类型或项目')
                    }
                } else {
                    if (this.sel_id.questions_stem && this.sel_id.questions_answer && this.sel_id.title) {
                        this.update({
                            questions_type_id: this.sel_id.questions_type_id,
                            questions_stem: this.sel_id.questions_stem,
                            subject_id: this.sel_id.subject_id,
                            exam_id: this.sel_id.exam_id,
                            questions_answer: this.sel_id.questions_answer,
                            title: this.sel_id.title,
                            questions_id: this.questions_id
                        })
                        sessionStorage.setItem('questions_id',JSON.stringify(''))
                    } else {
                        alert('请填写所有类型或项目')
                    }
                }
            }
        },
        destroyed(){
            sessionStorage.setItem('questions_id',JSON.stringify(''))
        }
    }
</script>

<style lang="scss" scoped>
    .stem {
        width: 500px;
        height: 80px;
        display: flex;
        flex-direction: column;

        .stem_g {
            margin-bottom: 10px;
        }

        input {
            width: 100%;
            height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
        }

        input::-webkit-input-placeholder {
            color: #cdbfbf;
        }
    }

    input::-webkit-input-placeholder {
        color: #cdbfbf;
    }

    .addbtn {
        padding: 12px 40px 12px 40px;
        background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
        font-size: 14px;
        color: #fff;
    }

    .editor-container {
        margin-bottom: 30px;
    }

    .tag-title {
        margin-bottom: 5px;
    }

    .exam_style {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }

    .exam_style .el-select {
        margin-top: 10px;
        display: block;
        width: 200px;
        height: 30px;
    }
</style>