<template>
    <div>
        <el-container class="container">
            <el-header class="header">
                <h2>CMS</h2>
            </el-header>
            <el-container>
                <el-card shadow="never" :body-style="{padding:'0px'}" >
                    <el-aside width="200px" class="aside">
                        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                            <template v-for="(menu,key) in menuList">
                                <el-submenu :index="key + ''" v-if="menu.sub_menu.length > 0" :key="key">
                                    <template slot="title">
                                        <i :class="menu.icon" v-if="menu.icon"></i>
                                        <span slot="title">{{menu.name}}</span>
                                    </template>
                                    <el-menu-item v-for="(subMenu,subKey) in menu.sub_menu" :index="key + '-' + subKey"
                                                  :key="key-subKey" @click="$router.push(subMenu.url)">
                                        <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                                        <span slot="title">{{subMenu.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item :index="key + ''" :key="key" v-else @click="$router.push(menu.url)">
                                    <i :class="menu.icon" v-if="menu.icon"></i>
                                    {{menu.name}}
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </el-aside>
                </el-card>

                <el-main>
                        <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {
                isCollapse: false
            }
        },
        computed: {
            menuList() {
                return this.$store.state.menu
            }
        }
    }
</script>

<style scoped>
    .aside {
        overflow: hidden;
    }

    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    .header {
        background-color: #409EFF;
        color: white;
    }
</style>
