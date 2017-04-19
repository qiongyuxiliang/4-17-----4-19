$(document).ready(function(){
	var strUrl=window.location.href; 
	var arrUrl=strUrl.split("/"); 
	var strPage=arrUrl[arrUrl.length-1].split('.')[0]; 
	var QueryString = {
		data: {},
		Initial: function() {
			var aPairs,aTmp;
			var queryString = location.search;
			queryString = queryString.substr(1, queryString.length);
			aPairs = queryString.split("&");
			for (var i = 0; i < aPairs.length; i++) {
				aTmp = aPairs[i].split("=");
				this.data[aTmp[0]] = aTmp[1];
			}
		},GetValue: function(key) {
			return QueryString.data[key];
		}
	};
	QueryString.Initial();
	var guid = QueryString.GetValue("guid");
	var userId= guid || 0;
	tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':strPage+'PageTj','tjtag':strPage+'PageLoad','tjuid':'ldy'});
	$('.btn').click(function(){
		location.href="http://hd.youyuan.com/html/2017/youyuan_zuotoujing/part.html?guid="+userId;
		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'indexPageTj','tjtag':'indexPageClick','tjuid':'ldy','userId':guid});
	})
	$.tips = (function () {//等待提示
		var timer=null;
		if (window.youyuan && window.youyuan.toast){
			return function (msg) {
				window.youyuan.toast(msg);
			}; 
		} else {
			if($('.tips').length==0){
				$('<div class="tips"></div>').prependTo('body');
			}
			$('.tips').empty().hide();
			return function (msg) {
				$('.tips').html(msg).show();
				clearInterval(timer);
				timer=setInterval(function () {
					$('.tips').empty().hide();
				}, 2000);
			}
		}
	})();	
    $('.sub').on('click',function(){				
		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'partPageTj','tjtag':'partPageClick','tjuid':'ldy','userId':guid});		
		var regName=/^\W+$/;
		var regPhoneNum=/^1[3|4|5|6|7|8|9][0-9]{9}$/;
		var userName=$('#nickname').val();//用户名
		var phoneNum=$('#tel').val();//手机号
		var getAge=$("#age select").find("option:selected").val();//年龄
		var getOccu=$('#job select').find('option:selected').val();//工作
		var getGra=$('#gra select').find('option:selected').val();//学历
		var getSex=getMenOrNot();
		function getMenOrNot(){
			if($('#sexMen').prop('checked')==true){
				return 0;
			}
			else{
				return 1;
			}
		}	
		getCity=$('#loc_city').val();//城市		
		if(userName==''){
			$.tips('用户名不能为空');
		}else if(!regName.test(userName)){
			$.tips('请输入正确的用户名');
		}else if(phoneNum==''){
			$.tips('手机号不能为空');
		}else if(!regPhoneNum.test(phoneNum)){
			$.tips('请填写正确的手机号');
		}
		else if(getCity==''){
			$.tips('城市不能为空');
		}else{			
			// 判断是否过期
			$.ajax({
				url: 'http://h5.xxl.dev.uyuan.info/v20/peachblossom/expire_party.html',
				type: 'get',
				dataType:'jsonp',
				jsonp:'Jsoncallback',
			success:function(data){
				if(data.code==-1){
					event.preventDefault();
					$('.repeat').show();
					$('.close').show();
					$('.state').show();
					$('.shadow_ray').show().css({
						'opacity':0.7
					});
					tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'infoPageTj','tjtag':'infoPageClick','tjuid':'ldy','userId':guid,'state':'fail'});
				}else if(data.code==0){
				   $.ajax({
					    url:'http://h5.xxl.dev.uyuan.info/v20/peachblossom/sign_party.html',
					    type:'get',
					    dataType:'jsonp',
					    jsonp:'Jsoncallback',
					    data:{
					    	realName:userName,
					    	sex:getSex,
					    	occupation:getOccu,
					    	memo:getGra,
					    	age:getAge,
					    	phone:phoneNum,
					    	city:getCity,
					    	userId:userId
					    },
					    // code:-1 手机号为空,-2 手机号已经报名,-3 系统错误,0 保存成功
					    success:function(data){ 
					    	if(data.code==0){
					    		console.log(data);
					    		event.preventDefault();
					    		$('.confir').show();
					    		$('.close').show();
					    		$('.state').show();
					    		$('.shadow_ray').show().css({
					    			'opacity':0.7
					    		});
					    		//表示成功
					    		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'infoPageTj','tjtag':'infoPageClick','tjuid':'ldy','userId':guid,'state':'success'});
					    	}
					    	if(data.code==-2){					    		
					    		//表示手机号已经注册过
					    		event.preventDefault();
					    		$('.repeat').show();
					    		$('.close').show();
					    		$('.state').show();
					    		$('.shadow_ray').show().css({
					    			'opacity':0.7
					    		});
					    		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'infoPageTj','tjtag':'infoPageClick','tjuid':'ldy','userId':guid,'state':'repeat'});
					    	}
					    	if(data.code==-1){
					    		$.tips('您填写的手机号为空，请重填');
					    		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'infoPageTj','tjtag':'infoPageClick','tjuid':'ldy','userId':guid,'state':'error'});
					    	}
					    	if(data.code==-3){
					    		//表示服务器异常				    		
					    		$.tips('服务器异常,请稍后再试');
					    		tj({'activity_name':'youyuan_zuotoujing_1q','tjtype':'infoPageTj','tjtag':'infoPageClick','tjuid':'ldy','userId':guid,'state':'fail'});
					    	}
					    }
			        })
				}
			}	
		})

	}
})

		
	
	// 关闭蒙层
	function closeGrayShadow(){
		$('.close').on('click',function(){
			$('.info').hide();
			$('.close').hide();
			$('.state').hide();
			$('.shadow_ray').hide();
		})
	}
	closeGrayShadow();

})