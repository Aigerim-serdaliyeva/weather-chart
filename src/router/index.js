import VueRouter from 'vue-router'

export const router = new VueRouter({
    linkActiveClass: "active",
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})