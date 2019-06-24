<template>
    <div id="learn-vue">
        <button @click="showExample = !showExample">Show/hide</button>
        <template v-if="showExample">
            <div class="sgds-accordion">
                <div class="sgds-accordion-set">
                    <a class="sgds-accordion-header">
                        accordion bar 1
                        <i class="sgds-icon sgds-icon-chevron-down"></i>
                    </a>
                    <div class="sgds-accordion-body">
                        <p>your content 1</p>
                    </div>
                </div>
                <div class="sgds-accordion-set">
                    <a class="sgds-accordion-header active">
                        accordion bar 2
                        <i class="sgds-icon sgds-icon-chevron-up"></i>
                    </a>
                    <div class="sgds-accordion-body is-open">
                        <p>
                            You can add
                            <code>is-open</code> class to
                            <code>sgds-accordion-body</code> to show the
                            content on page load
                        </p>
                    </div>
                </div>
                <div class="sgds-accordion-set">
                    <a class="sgds-accordion-header">
                        accordion bar 3
                        <i class="sgds-icon sgds-icon-chevron-down"></i>
                    </a>
                    <div class="sgds-accordion-body">
                        <p>your content 3</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showExample: false
        };
    }
};
</script>
