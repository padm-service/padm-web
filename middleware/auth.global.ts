export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = userAuthStore();
    const token = useCookie('hz_token').value;

    if (!token && !authStore.isAuthenticated && to.path !== '/iam/login' && to.path !== '/iam/register') {
        return navigateTo('/iam/login');
    }
    // 如果token存在但状态未同步，同步用户状态
    if (token && !authStore.isAuthenticated) {
        await authStore.fetchUser();
    }
});

// if (token && ['/iam/login', '/iam/register'].includes(to.path)) {
//     return navigateTo('/');
// }
// if (!token && to.meta.requiresAuth) {
//     return navigateTo('/iam/login');
// }