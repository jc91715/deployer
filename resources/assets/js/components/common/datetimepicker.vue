<template>
    <div>
        <input ref="picker" class="datepicker-input form-control" type="text"  v-model="value" v-on:keyup,change="emitValue()">
    </div>
</template>

<script>
    export default {
        name: 'datetimepicker',
        props: {
            value: {
                type: String,
                default: ''
            },
            step: {
                type: Number,
                default: 5
            },
            format: {
                type: String,
                default: 'yyyy-mm-dd hh:ii'
            },
        },
        methods: {
            emitValue (event) {
                this.$emit('input', $(event.currentTarget).val());
            }
        },
        watch: {
            value: {
                handler: function (val, oldVal) {
                    this.$emit('input', val);
                }
                , deep: true
            },
        },
        mounted () {
            let options = {
                step: this.step,
                format: this.format,
            };
            $(this.$refs.picker).datetimepicker(options)
                .on('changeDate', () => {
                    this.$emit('input', $(this.$refs.picker).val());
                });
        },
        destroyed () {

        }
    }
</script>
