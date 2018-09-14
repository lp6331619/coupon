<template>
    <div class="home">
        <v-menu></v-menu>
        <div class="container">
            <div class="countryBox">
                <router-link to="/home/lang" class="country">
                    {{country}}
                </router-link>
            </div>
            <router-link to="/" class="banner">
                <img :src="img" alt="">
            </router-link>
            <!-- <div class="p20" style="word-break: break-all; word-wrap:break-word;">
            <div style="background:red">{{dddd}}</div>{{$store.state.user.userinfo.token}}</div> -->
            <div class="ticketBox flex">
                <a @click="$router.push('/home/ticket?status=2')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huoche"></use>
                    </svg>
                    火车
                </a>
                <a @click="$router.push('/home/ticket?status=4')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-feiji"></use>
                    </svg>
                    飞机
                </a>
                <a @click="$router.push('/home/ticket?status=1')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qiche"></use>
                    </svg>
                    汽车
                </a>
                <a @click="$router.push('/home/ticket?status=3')">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-lunchuan"></use>
                    </svg>
                    轮船
                </a>
            </div>
            <div class="ticketBox btnBox flex">
                <router-link :to="`/home/list2?type=1&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chi"></use>
                    </svg>
                    吃
                </router-link>
                <router-link :to="`/home/list2?type=2&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhu"></use>
                    </svg>
                    住
                </router-link>
                <router-link :to="`/home/list2?type=3&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-hang"></use>
                    </svg>
                    行
                </router-link>
                <router-link :to="`/home/list2?type=4&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yu"></use>
                    </svg>
                    娱
                </router-link>
                <router-link :to="`/home/list2?type=5&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gou"></use>
                    </svg>
                    购
                </router-link>
                <router-link :to="`/home/list2?type=6&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-you"></use>
                    </svg>
                    游
                </router-link>
                <router-link :to="`/home/list2?type=7&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jingdian"></use>
                    </svg>
                    景点
                </router-link>
                <router-link :to="`/home/list2?type=8&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tongxun"></use>
                    </svg>
                    通讯
                </router-link>
                <router-link :to="`/home/list2?type=9&country_id=${country_id}`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jinrong"></use>
                    </svg>
                    金融
                </router-link>
                <router-link :to="`/home/list2?type=1&country_id=0`">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qita"></use>
                    </svg>
                    其他
                </router-link>
            </div>
            <div class="product bgfff mt10" >
                <div class="title">美食</div>
                <div class="swiper-container" id="swiperBox">
                    <ul class="boxImg swiper-wrapper clearfix">
                        <li class="swiper-slide" v-for="(item,index) in dataBox.goods_1" :key="index">
                            <router-link :to="`/home/detail2?id=${item.id}`">
                                <div class="imgBox" ref="imgBox" :style="height"><img :src="item.img[0]" alt=""></div>
                                <div class="name" v-text="item.name"></div>
                                <div class="price red">¥ {{item.price}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="product bgfff mt10" >
                <div class="title">住宿</div>
                <div class="swiper-container" id="swiperBox2">
                    <ul class="boxImg swiper-wrapper clearfix">
                        <li class="swiper-slide" v-for="(item,index) in dataBox.goods_2" :key="index">
                            <router-link :to="`/home/detail2?id=${item.id}`">
                                <div class="imgBox" :style="height"><img :src="item.img[0]" alt=""></div>
                                <div class="name" v-text="item.name"></div>
                                <div class="price red">¥ {{item.price}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="product bgfff mt10" >
                <div class="title">娱乐</div>
                <div class="swiper-container" id="swiperBox3">
                    <ul class="boxImg swiper-wrapper clearfix">
                        <li class="swiper-slide" v-for="(item,index) in dataBox.goods_4" :key="index">
                            <router-link :to="`/home/detail2?id=${item.id}`">
                                <div class="imgBox" :style="height"><img :src="item.img[0]" alt=""></div>
                                <div class="name" v-text="item.name"></div>
                                <div class="price red">¥ {{item.price}}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import HomeJs from './Home.js';
    export default HomeJs;
</script>
</script>
<style scoped lang="sass">
    .home
        position: relative
    .countryBox
        position: absolute
        top: 20px
        left: 20px
        border-radius: 30px
        overflow: hidden
        background: rgba(245,108,108,.7)
        a
            display: inline-block
            color: #fff
            padding: 0 20px
            height: 35px
            line-height: 35px
        .country
            position: relative
            padding-right: 35px
            &:before
                content: ''
                position: absolute
                right: 18px
                top: 14px
                border-width: 6px;
                border-style: solid;
                border-color: #fff transparent transparent transparent;
    .banner
        img
            width: 100%
    .ticketBox
        background: #fff
        a
            padding: 20px 0
            text-align: center
            width: 25%
            .icon
                display: inline-block
                width: 100%
                font-size: 40px
                padding-bottom: 10px
    .btnBox
        margin-top: 10px
        a
            width: 20%
    .product
        padding: 10px 0;
        .title
            display: inline-block
            border-radius: 0 40px 40px 0
            background: #4a4a4a
            color: #fff
            padding: 5px 20px
    .boxImg
        padding: 10px 0 0 10px
        li
            .name
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px
                line-height: 30px
            .price
                font-size: 16px
    .imgBox
        overflow: hidden
</style>
