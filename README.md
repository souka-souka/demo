<html>
   <head>
      <title>个人信息</title>
      <meta charset="utf-8">
   </head>
   <body>
      <form>
         <table border="1px" align="center"width="60%" height="70%" 
                background="http://static.blog.csdn.net/skin/ink/images/head_bg.jpg">
         <caption><h1>个人信息</h1></caption>
         <tr><!--第1行开始-->
            <th>姓名</th>
            <th>
               <input type="text" value="唐伯虎" />
            </th>
            <th>相片</th>
            <th>
               <input type="file" value="上传吧"/>
            </th>
         </tr><!--第1行结束-->
 
         <tr><!--第2行开始-->
            <th>性别</th>
            <th>
               <input type="radio" name="xingbie"  />男<!-- 单选按钮的name要一样 -->
               <input type="radio" name="xingbie"  checked/>女<!-- selected 和它的区别是什么？都是选择 -->
            </th>
            <th>爱好</th>
            <th>
               <input type="checkbox" name="1"  />吃饭<!-- input可以用单标签的形式 -->
               <input type="checkbox" name="1"  />睡觉
               <input type="checkbox" name="1"  />上网<br/>
               <input type="checkbox" name="1"  />听歌
               <input type="checkbox" name="1"  checked/>泡妞
               <input type="checkbox" name="1"  />洗澡
            </th>
         </tr><!--第2行结束-->
 
         <tr><!--第3行开始-->
            <th>地址</th>
            <th colspan="3">
               <select name="dizhi" size="1">
                  <option  >江西省</option>
                  <option  >福建省</option>
                  <option  >北京市</option>
               </select>
               
               <select name="dizhi" size="1">
                  <option  >九江市</option>
                  <option  >晋江市</option>
                  <option  >北京市</option>
               </select>
               
               <select name="dizhi" size="1">
                  <option  >都昌县</option>
                  <option  >英林镇</option>
                  <option  >北京市</option>
               </select>
            </th>
         </tr><!--第3行结束-->
 
         <tr><!--第4行开始-->
            <th>自我描述</th>
            <th colspan="3">
               <textarea name="名字" rows="6" cols="90" >你真他妈的帅呆了</textarea><!--这里不能用单标签-->
            </th>
         </tr><!--第4行结束-->
 
         <tr><!--第5行开始-->
            <th>密码</th>
            <th colspan="3">
               <input type="password" size="80" maxlength="15"/>
            </th>
         </tr><!--第5行结束-->
 
         <tr><!--第6行开始-->
            <th colspan="2">
               <input type="reset" /><!--需要用form来包含，否则没有用-->
            </th>
            
            <th colspan="2">
               <input type="submit" />
            </th>
           
         </tr><!--第6行结束-->
         </table>
      </form>
   </body>
</html>
