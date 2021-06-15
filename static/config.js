const config = {
    /*方式一：设置转发
    这里可以任意设置,例如设置：/api-wisdom/，则需要在nginx做一层转发
      location /api-excel/ {
          proxy_pass http://119.45.197.238:8080/;
      }
    备注：为了提高加载性能，文件是压缩后的，所以如果nginx没有开启静态压缩，请开启静态压缩，否则无法请求到压缩文件。
    开启方法：nginx增加一项配置即可=>     gzip_static on; #静态压缩
    详细信息请参考：https://www.jianshu.com/p/ec84bb2b83d0
    */
    api: '/api-excel',
    /*
    方式二：不设置转发 后台服务需要开启跨域设置
    如果不设置转发，这里配置自己的ip+端口即可。或者配置对应的域名。
    */
    // ip: 'http://119.45.197.238:8080/'
}