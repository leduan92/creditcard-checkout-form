<template>
    <v-card class="cc-checkout-content"
            width="100vw" height="95vh"
    >
        <v-layout>
            <v-flex align-self-start md7>
                <slot name="theOrder"></slot>
            </v-flex>
            <v-flex align-self-end md>
                <slot name="thePayment"></slot>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "TheMainContent"
    }
</script>

<style media="screen">
    .cc-checkout-content {
        background: linear-gradient(to right, #46394E 0%, #46394E 58%, #E4E0E2 58%, #E4E0E2 100%);
        margin: 5vw 3vw 0;
        border-radius: 24px!important;
        box-shadow: -14px 11px 5px 0px rgba(0, 0, 0, 0.2) !important;
    }
</style>
