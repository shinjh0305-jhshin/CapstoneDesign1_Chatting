<template>
    <div class="container p-5">
        <div class="mb-4 bg-light rounded-3" id="login-box">
            <h1 class="mb-5">Login</h1>
            <form>
                <div class="mb-2 row">
                    <label for="userID" class="col-sm-4 col-form-label">ID</label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="userInfo.userID" id="userID" placeholder="ID" required> <br/>
                    </div>
                </div>

                <div class="mb-2 row">
                    <label for="userPWD" class="col-sm-4 col-form-label">Password</label>
                    <div class="col-sm-8">
                    <input type="password" class="form-control" v-model="userInfo.userPWD" id="userPWD" placeholder="Password" required> <br/>
                    </div>
                </div>

                <button class="btn btn-danger w-100" @click="loginSubmit" >Login</button>
            </form>
            <p id="noAccount">If you don't have an account....</p>
            <button class="btn btn-primary w-100"  onclick="location.href='http://www.naver.com'">Create account</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPrompt',
    computed: {
        console: () => console,
        window: () => window,
    }
}
</script>

<script setup>
    import useAxios from '../modules/axios'
    //import { useUserInfoStore } from '/@stores/userinfo'
    import { reactive } from 'vue'

    const { axiosGet, axiosPost } = useAxios();

    const userInfo = reactive({
        userID : '',
        userPWD : ''
    })

    const onLoginSuccess = (respData) => {
        localStorage.setItem('userID', respData.userInfo.ID);
        localStorage.setItem('NICK', respData.userInfo.NICK);
    }

    const loginSubmit = () => {
        console.log("hi");
        console.log(`userId : ${userInfo.userID} userPWD : ${userInfo.userPWD}`)
        axiosPost('/auth/login_process', userInfo, onLoginSuccess);
    }
</script>

<style>
#login-box {
    padding: 5% 30% 5% 30%;
}
</style>