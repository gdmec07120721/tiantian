import Mock from 'mockjs';

Mock.mock(/\/news\/query_publish_news_list/, {
  //缺少时间字段
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
      'news_image_url': 'http://image.jpd' //新闻图片
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

//缺少用户广告信息添加

// url: http://tiantiantui.top/news/save_user_edit_news
// 请求方式：Post
// 入参：
// {
// "user_business_card":{
// "business_card_id":22,//名片id
// }
// "banner_ad_info":{
// "banner_ad_id":22,//通栏广告id
// }
// "news_parent_id":11;//新闻的父id，也是新闻来源的news_id 
// "text":"<div>****</div>",//网页内容

// }
// 出参：
// {
// "retcode":"0",
// "retmsg":"success",
// "result_rows":[
// {				
// "news_id":1, //新闻id
// "news_headline":"华为鸿蒙系统即将推出", //新闻标题
// "news_source_detail":"今日头条",//新闻机构
// "news_image_url":"http://image.jpd",//新闻图片			
// "news_url":"http://tiantiantui.top/news/query_user_own_news?news_id=1 //分享到微信的链接

// }
// ]
// }

//url: http://tiantiantui.top/news/save_user_edit_news
// 请求方式：Post
// 入参：
// {
// "user_business_card":{
// "business_card_id":22,//名片id
// }
// "banner_ad_info":{
// "banner_ad_id":22,//通栏广告id
// }
// "news_parent_id":11;//新闻的父id，也是新闻来源的news_id
// "text":"<div>****</div>",//网页内容

// }
