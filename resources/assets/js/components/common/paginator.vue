<template>
    <div>
        <ul class="pagination" v-if="show">
            <li v-if="hasPrevious"><a href="#" @click.prevent="loadPrevious()">«</a></li>
            <li v-else class="disabled"><span>«</span></li>

            <template v-for="element in elements">
                <template v-if="element.type == 'string'">
                    <li class="disabled"><span>{{ element.value }}</span></li>
                </template>
                <template v-if="element.type == 'array'">
                    <template v-for="item in element.value">
                        <li class="active" v-if="item == pager.current_page"><span>{{ item }}</span></li>
                        <li v-else><a href="#" @click.prevent="func(item)">{{ item }}</a></li>
                    </template>
                </template>
            </template>

            <li v-if="hasNext"><a href="#" @click.prevent="loadNext()">»</a></li>
            <li v-else class="disabled"><span>»</span></li>
        </ul>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: ['pager', 'func'],
        data(){
            return {}
        },
        computed: {
            hasPrevious: function () {
                return this.pager.current_page > 1;
            },
            hasNext: function () {
                return this.pager.current_page < this.pager.last_page;
            },
            show: function () {
                return this.hasPrevious || this.hasNext;
            },
            elements: function () {
                let ret = this.getElements(3);
                let elements = [];
                if (ret.first.length > 0) {
                    elements.push({
                        type: 'array',
                        value: ret.first
                    });
                }
                if (ret.slider.length > 0) {
                    elements.push({
                        type: 'string',
                        value: '...'
                    });
                    elements.push({
                        type: 'array',
                        value: ret.slider
                    });
                }
                if (ret.last.length > 0) {
                    elements.push({
                        type: 'string',
                        value: '...'
                    });
                    elements.push({
                        type: 'array',
                        value: ret.last
                    });
                }
                return elements;
            }
        },
        methods: {
            loadPrevious: function () {
                if (!this.hasPrevious) {
                    return;
                }
                this.func(this.pager.current_page - 1);
            },
            loadNext: function () {
                if (!this.hasNext) {
                    return;
                }
                this.func(this.pager.current_page + 1);
            },
            getElements: function (onEachSide) {
                if (this.pager.last_page < (onEachSide * 2) + 6) {
                    return this.getSmallSlider();
                }
                return this.getUrlSlider(onEachSide);
            },
            getSmallSlider: function () {
                return {
                    first: _.range(1, this.pager.last_page + 1),
                    slider: [],
                    last: []
                };
            },
            getUrlSlider: function (onEachSide) {
                if (!this.hasPrevious && !this.hasNext) {
                    return {
                        first: [],
                        slider: [],
                        last: []
                    };
                }
                let w = onEachSide * 2;

                if (this.pager.current_page < w) {
                    return this.getSliderTooCloseToBeginning(w);
                } else if (this.pager.current_page > (this.pager.last_page - w)) {
                    return this.getSliderTooCloseToEnding(w);
                }

                return this.getFullSlider(onEachSide);
            },
            getSliderTooCloseToBeginning: function (w) {
                return {
                    first: _.range(1, w + 3),
                    slider: [],
                    last: this.getFinish()
                };
            },
            getSliderTooCloseToEnding: function (w) {
                return {
                    first: this.getStart(),
                    slider: [],
                    last: _.range(this.pager.last_page - (w + 2), this.pager.last_page + 1)
                };
            },
            getFullSlider: function (onEachSide) {
                return {
                    first: this.getStart(),
                    slider: this.getAdjacentUrlRange(onEachSide),
                    last: this.getFinish()
                };
            },
            getAdjacentUrlRange: function (onEachSide) {
                return _.range(this.pager.current_page - onEachSide, this.pager.current_page + onEachSide + 1);
            },
            getStart: function () {
                return [1, 2];
            },
            getFinish: function () {
                return [
                    this.pager.last_page - 1,
                    this.pager.last_page
                ]
            }
        }
    }
</script>
