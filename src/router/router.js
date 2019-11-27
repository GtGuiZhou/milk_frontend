// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = process.env.NODE_ENV === 'development'?file => require('@/pages/' + file).default:file => () => import('@/pages/' + file)
const sortRouter = (name,path,component) => {
    return {
        name: name,
        path: '/' + path,
        component: _import(component)
    }
}
export default [
    {
        path:'/',
        redirect: { name: 'index' },
    },
    sortRouter('index','index','index'),
    sortRouter('login','login','login'),
    sortRouter('register','register','register'),
    {
        name:'admin',
        path:'admin',
        component:_import('admin/layout'),
        children: [
            sortRouter('banner','admin/banner','admin/banner'),
            sortRouter('authMenu','admin/auth/menu','admin/banner'),
            sortRouter('authRole','admin/auth/role','admin/auth/role'),
            sortRouter('authRule','admin/auth/rule','admin/auth/rule'),
            sortRouter('user','admin/user','admin/user/user'),
            sortRouter('admin','admin/admin','admin/admin/admin'),
            sortRouter('templateCrud','admin/template/crud','admin/template/crud'),
            sortRouter('database','admin/dev/database','admin/dev/database'),
            sortRouter('sysconfig','admin/sysconfig','admin/sysconfig/sysconfig'),
            sortRouter('notice','admin/notice','admin/notice/notice'),
        ]
    }
]
