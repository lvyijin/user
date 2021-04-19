<template>
<div id="app">
    <p>test</p>
    <select v-model="searchKey">
        <option disabled value="">Please select one type to search</option>
        <option value="name">name</option>
        <option value="age">age</option>
    </select>
    <span>select {{ searchKey }}</span>
</div>
    
</template>

<script>
export default{
    // props 是关于变量类型的定义，不是用来初始化的
    props:{
        searchKey: String
    }
    // 像这种写法是错误的，会报错 “error  The "searchKey" property should be a constructor”
    // props:{
    //     searchKey: ""
    // }
}
</script>

<style scoped>

</style>