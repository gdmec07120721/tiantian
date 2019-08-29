import Mock from 'mockjs';

Mock.mock(/\/news\/query_publish_news_list/, {
  'limit': 10,
  'total_num': 37,
  'page_num': 1,
  'pages': 3, //总页数
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图
    },
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图片
    },
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图片
    }, {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图
    },
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图片
    },
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻图片
    }
  ]
});

Mock.mock(/\/news\/query_publish_news_info/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'text': '<div>halo</div>' //新闻内容
    }
  ]
});

Mock.mock(/\/news\/save_user_edit_news/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新闻标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'http://image.jpd', //新闻图片
      'news_url': 'http://tiantiantui.top/news/query_user_own_news?news_id=1' //分享到微信的链接
    }
  ]
});

Mock.mock(/\/news\/query_user_own_news/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'user_business_card': {
        'business_card_id': 22, //名片id
        'user_head_portrait': 'https://img.yzcdn.cn/vant/cat.jpeg', //用户头像图片的连接
        'user_name': '张三', 
        'user_company_name': 'xxxxx公司名称',
        'position': 'xxxx职位',
        'telphone': 'xxxxx电话号码',
        'ad_slogan': '广告标语',
        'card_type': 0//广告模板类型,默认1
      },
      'banner_ad_info': {
        'banner_ad_id': 22, //通栏广告id
        'ad_image_url': 'https://img.yzcdn.cn/vant/cat.jpeg', //广告图片的链接
        'ad_click_effect_type': 1, //"广告点击效果:1:跳转链接；2：拨打电话；3：展示海报";
        'ad_click_content': '广告点击内容',
        'location_type': 1 //"广告位置：1：底部；2：顶部
      },
      'text': '<div>afsfdsfdsfsdfdsf</div>', //网页内容
      'news_id': 11//新闻id
    }
  ]
});

Mock.mock(/\/images\/save_user_add_image/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'image_url': 'https://img.yzcdn.cn/vant/apple-1.jpg' //新闻id
    }
  ]
});

Mock.mock(/\/user\/page_query_user_ad/, {
  'retcode': 0,
  'retmsg': 'ok',
  'result_rows': [{
    'user_business_card': {
      'ad_id': 22, //名片id
      'user_head_portrait': 'https://img.yzcdn.cn/vant/cat.jpeg', //用户头像图片的连接
      'user_name': '张三', 
      'user_company_name': 'xxxxx公司名称',
      'position': 'xxxx职位',
      'telphone': 'xxxxx电话号码',
      'ad_slogan': '广告标语',
      'card_type': 0//广告模板类型,默认1
    },
    'banner_ad_info': {
      'ad_id': 22, //通栏广告id
      'ad_image_url': 'https://img.yzcdn.cn/vant/cat.jpeg', //广告图片的链接
      'ad_click_effect_type': 1, //"广告点击效果:1:跳转链接；2：拨打电话；3：展示海报";
      'ad_click_content': '广告点击内容',
      'location_type': 1 //"广告位置：1：底部；2：顶部
    }
  }]
});

Mock.mock(/\/user\/add_user_ad/, {
  'retcode': '0',
  'retmsg': 'success'
});

Mock.mock(/\/user\/send_message_to_mobile/, {
  'retcode': 0,
  'retmsg': 'ok',
  'result_rows': [{
    'uid': 1 //用户Id
  }]       
});

Mock.mock(/\/user\/verify_code/, {
  'retcode': 0,
  'retmsg': 'ok',
  'result_rows': []
});

Mock.mock(/\/user\/user_news_statistics/, {
  'retcode': 0,
  'retmsg': 'ok',
  'result_rows': [
    {
      'save_ad_cost': 1111, //节约广告费
      'profit': 500, //收益
      'expose_cnt': 500, //曝光数
      'click_cnt': 500, //点击量
      'forward_cnt': 500 //转发量
    }
  ]
});

Mock.mock(/\/user\/page_query_user_click_user_news/, {
  'retcode': 0,
  'retmsg': 'ok',
  'total_num': 10,       //总数
  'total_page': 2,       //总页数
  'page': 2,             //当前页数
  'limit': 10,           //每页大小
  'result_rows': [
    {
      'news_headline': '生活大爆炸', //新闻标题
      'expose_num': 500, //阅读数
      'click_num': 500, //点击量
      'forward_num': 500 //转发量
    }
  ]
});

Mock.mock(/\/user\/user_data_cnt/, {
  'retcode': 0,
  'retmsg': 'ok',
  'result_rows': [
    {
      'today_cnt': 11, //今日查看总数
      'history_cnt': 500 //看我总数
    }
  ]
});



Mock.mock(/\/user\/page_query_click_user_news/, {
  'retcode': 0,
  'retmsg': 'ok',
  'total_num': 10,       //总数
  'total_page': 2,       //总页数
  'page': 2,             //当前页数
  'limit': 10,           //每页大小
  'result_rows': [
    {
      'news_headline': '生活大爆炸', //新闻标题
      'we_chat_nickname': '小冰', //昵称
      'action_type': 1 //用户行为 1:查看新闻 2 点击广告
    },
    {
      'news_headline': '生活大爆炸', //新闻标题
      'we_chat_nickname': '小冰', //昵称
      'action_type': 2 //用户行为 1:查看新闻 2 点击广告
    }
  ]
});


