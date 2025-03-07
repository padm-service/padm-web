import type { User } from "~/lib/type";

const { get } = useApi();
export const userAuthStore = defineStore('auth', () => {
    const selectUser = ref([]);
    const keyWord = ref('');
    const searchUser = ref<User[]>([]);
    const user = ref<User | null>(null);
    const userList = ref<User[]>([]);
    const isAuthenticated = ref(false);
    const fetchUser = async () => {
        try {
            const data = await get('/user');
            user.value = data as User;
            isAuthenticated.value = true;
        } catch (error) {
            clearUser();
        }
    }
    const clearUser = () => {
        user.value = null;
        isAuthenticated.value = false;
        useCookie('hz_token').value = null;
        navigateTo('/iam/login');
    }

    return { user, isAuthenticated, fetchUser, clearUser, userList, selectUser };
})