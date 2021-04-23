<template>
<div id="app">
    <div class="key">
        <select v-model="searchKey">
            <option disabled value="">Please select one type to search</option>
            <option value="all">all</option>
            <option value="name">name</option>
            <option value="age">age</option>
        </select>
        <!-- 如何获取 input 的内容并赋值给一个变量，这个变量又不能是 props，所以得通过 data() 返回一个空变量 -->
        <input v-model="content" placeholder="edit me">
        <button v-on:click="search">search</button>
    </div>
    <div class="user_list">
    <p v-if="this.users.length==0">no users found</p>
    <table v-else border="1" cellspacing="0" cellpadding="1">
        <tr>
            <th class="column">id</th>
            <th class="column">name</th>
            <th class="column">age</th>
            <th class="column">edit</th>
        </tr>
        <tr v-for="user in getInitUsers" v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>
                <button v-on:click="deleteUser(user.id)">delete</button>
            </td>
        </tr>
    </table>
    </div>

</div>
    
</template>


<script>
// import user from '../api/user'

export default{
    data(){
        return {
            searchKey: "",
            content: "",
            users: [],
        }
    },
    computed:{
        getInitUsers(){
            return this.users
        }
    },
    methods: {
        search(){
            var vm = this
            var url = ""
            if(this.searchKey == "name"){
                url = "/api/user/?name="+this.content
            }else if(this.searchKey=="age"){
                url =  "/api/user/?age="+this.content
            }else if(this.searchKey=="all"){
                url = "/api/user?key="+this.content
            }else{
                url="/api/user"
            }
            vm.$http.get(url).then(
                function(data){
                    console.log("enter search")
                    this.users = data.body
                    console.log(this.users)
                }
            ).catch(function(response){
                console.log("failed to search"+response)
            })
        },
        getUsers(){
            var vm = this
            vm.$http.get("/api/user").then(
                function(data){
                    this.users = data.body
                }
            ).catch(function(response){
                console.log("failed" + response)
            })
        },
        deleteUser(id){
            var vm = this
            vm.$http.delete("/api/user/"+id).then(
                function(data){
                    window.alert("delete success " + data)
                    vm.getUsers();
                }

            ).catch(
                function(data){
                    window.alert("delete success " + data)
                }
            )
        }
        // postUser(){
        //     var vm = this
        //     vm.$http.post("/api/user",
        //     {
        //         name:
        //     },
        //     {emulateJSON: true}
        //     ).then(

        //     ).catch(

        //     )
        // }
    },
    created() {
        this.getUsers()
    }
}
</script>

<style scoped>
.key{
    width: 600px;
    height: 40px
}
.column{
    width: 180px;
}
.user_list{
    margin-top: 10px
}

/*模态框*/
.modal {
    display: none; /* 默认隐藏 */
    position: fixed; /* 根据浏览器定位 */
    z-index: 1; /* 放在顶部 */
    left: 0;
    top: 0;
    width: 100%; /* 全宽 */
    height: 100%; /* 全高 */
    overflow: auto; /* 允许滚动 */
    background-color: rgba(0,0,0,0.4); /* 背景色 */
}
/*模态框内容*/
.modal-content {
    display: flex; /*采用flexbox布局*/
    flex-direction: column; /*垂直排列*/
    position: relative;
    background-color: #fefefe;
    margin: 15% auto; /*距顶部15% 水平居中*/
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    animation: topDown 0.4s; /*自定义动画，从模态框内容上到下出现*/
}
@keyframes topDown {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
}
/*模态框头部*/
.modal-header {
    display: flex; /*采用flexbox布局*/
    flex-direction: row; /*水平布局*/
    align-items: center; /*内容垂直居中*/
    justify-content: space-between; 
}
/*关闭X 样式*/
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>