<template>
    <div >
        <div class="preface">
            <div>
                <h1>您好，<br/>我是葡萄，<br/>是用代码构建世界的工程师！</h1>
                <h2>擅长网站、小程序、App开发。</h2>
            </div>
        </div>


        <table class="more" >
            <tr>
                <td style="border-right: 1px solid #eeeeee;width: 250px">
                    <div>
                        <h2>联系我</h2>
                        <div class="tag">邮箱：GtGuiZhou@qq.com</div>
                        <div class="tag">微信：TguoGogogo</div>
                    </div>
                </td>
                <td style="border-right: 1px solid #eeeeee;width: 300px">
                    <h2>小程序开发经历</h2>
                    <div>
                        <h3>微友趣比价</h3>
                        一款集卡微信小程序，用户对卡牌进行收集、合成。用户可以交易卡牌。微信分享获取抽卡次数。每日签到获取抽卡次数。通过小程序开放接口向用户发放通知。
                    </div>
                    <div>
                        <h3>夺秒速拍</h3>
                        一款拍卖小程序，用户凭运气获得商品的价格，类似一个微信商城项目，涉及支付、物流、商品管理等操作。
                    </div>
                </td>
                <td style="width: 300px">
                    <h2>网站开发经历</h2>
                    <div>
                        <h3>贵州工程应用技术学院第二课堂登记系统</h3>
                        用于管理全校学生学分成绩等级的系统，涉及权限管理，并发操作，数据库优化，分布式存储等技术。
                    </div>
                </td>
            </tr>
        </table>


        <footer>
            <a href="http://www.miitbeian.gov.cn/" >黔ICP备17010371号-2</a><br>
            <a href="http://beian.gov.cn/portal/registerSystemInfo?recordcode=52263102000130">黔公网安备 52263102000130号</a>
        </footer>

    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                form: {
                    phone: '',
                    content: ''
                }
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .preface {
        font-size: 1.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .more {
        margin: 0 auto;
        width: 900px;
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
    }

    body{
        color: #eeeeee;
    }

    .more .tag{
        border-bottom: 1px solid #eeeeee;
        padding: 10px 0;
    }

    .more td{
        vertical-align: top;
        padding: 0 20px;
    }


    footer{
        margin-top: 200px;
        text-align: center;
        color: gray;
    }

    footer a{
        color: gray;
        text-decoration: none;
    }

</style>