// 引入mint全部组件
import { Indicator } from 'mint-ui';
export default {
    name: 'home',
    methods: {

    },
    created() {
        this.getList()
    },
    data() {
        return {
            selected: this.$route.query.status,
            type: this.$route.query.type,
            list: [],
            dataBox: [],
        }
    },
    methods: {
        tab(num) {
            this.type = num
            this.getList()
        },
        tab2(num) {
            this.selected = num
            this.listData()
        },
        getList() {
            Indicator.open('加载中！')
                // let dataBox = JSON.parse(JSON.stringify(this.dataBox))
            if (this.type == '1') {
                this.$$api_order_ticketOrder_lists({
                    data: {},
                    fn: data => {
                        Indicator.close();
                        this.dataBox = data
                        this.dataBox.forEach((item) => {
                            if(item.passagers){
                                let passagersBox = JSON.parse(item.passagers);
                                this.$set(item, 'passagersBox', passagersBox)
                            }
                        })
                        this.listData()
                    },
                    errFn: (err) => {
                        Indicator.close();
                        this.$message.error(err.msg)
                    }
                })
            } else {
                this.$$api_order_order_lists({
                    data: {},
                    fn: data => {
                        Indicator.close();

                        this.dataBox = data
                        this.dataBox.forEach((item) => {
                            if (item.passagers) {
                                let passagersBox = JSON.parse(item.passagers);
                                this.$set(item, 'passagersBox', passagersBox)
                            }
                        })
                        this.listData()
                    },
                    errFn: (err) => {
                        Indicator.close();
                        this.$message.error(err.msg)
                    }
                })
            }

        },
        listData() {
            this.list = []
            this.dataBox.forEach((item) => {
                if(this.type==1){
                    switch (parseInt(this.selected)) {
                        case 1:
                            if (item.status == 0) {
                                this.list.push(item)
                            }
                            break;
                        case 2:
                            if (item.status == 2) {
                                this.list.push(item)
                            }
                            break;
                        // case 2:
                        //     if (item.status == 2) {
                        //         this.list.push(item)
                        //     }
                        //     break;
                        case 4:
                            if (item.status == 4 || item.status == 5) {
                                this.list.push(item)
                            }
                            break;
                        case 5:
                            this.list.push(item)
                            break;
                    }
                }else{
                    switch (parseInt(this.selected)) {
                        case 1:
                            if (item.status == 0) {
                                this.list.push(item)
                            }
                            break;
                        case 2:
                            if (item.status == 4) {
                                this.list.push(item)
                            }
                            break;
                        case 3:
                            if (item.status == 5) {
                                this.list.push(item)
                            }
                            break;
                        case 4:
                            // item.status == 6 || 改签
                            if (item.status == 7) {
                                this.list.push(item)
                            }
                            break;
                        case 5:
                            this.list.push(item)
                            break;
                    }
                }
            })
        },
        toDetail(item) {
            this.$router.push({
                path: '/pay/orderDetail',
                query: {
                    id: item.id,
                    status: item.status
                }
            })
        },
        toDetil2(item) {
            this.$router.push({
                path: '/pay/orderDetail2',
                query: {
                    id: item.id,
                    status: item.status
                }
            })
        }
    },
    components: {}
}