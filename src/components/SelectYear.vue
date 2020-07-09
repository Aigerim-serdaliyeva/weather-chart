<template>
    <div>
        <!-- object value -->
        <model-select 
            :options="options"
            v-model="value"
            placeholder="select item">
        </model-select>
    </div>
</template>

<script>
  import { ModelSelect } from 'vue-search-select'

    export default {
        props: {
            options: {
                type: Array,
                default: () => []
            },
            item: {
                type: String,
                default: ''
            }
        },
        methods: {
            reset () {
                this.item = {}
            },
            selectFromParentComponent1 () {
                // select option from parent component
                this.item = this.options[0]
            }
        },
        components: {
            ModelSelect
        }
    }
</script>
