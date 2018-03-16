function checkURL() {
	var arr = location.href.split("#"),
		hash = "";
	arr.length > 1 && (hash = arr[1]), "" !== hash ? (loadURL(hash), active(hash)) : loadURL(chanUrl)
}

function loadURL(url) {
	var content = $("#loadMain"),
		target = common_conf.baseURL + url;
	$.ajax({
		type: "get",
		url: target,
		cache: !1,
		data: "",
		dataType: "html",
//		beforeSend: function() {
//			window.location.hash = url;
//			var title = "";
//			title = $('.loadNav ul li a[href="#' + url + '"]').text(), "medical.html" == chanUrl ? $("title").text("解决方案-" + title+'-智豆科技，提供智能医疗、智能物流等行业的智能化解决方案。') : $("title").text("产品与服务-" + title+'-智豆科技，五大核心类型联网模块，为智能化改造保驾护航。')
//		},
		success: function(returnData) {
			var res = returnData;
			try {
				returnData = $.parseJSON(res)
			} catch(err) {}
			if("object" != typeof returnData) setTimeout(function() {
				content.css("opacity", 0).html(returnData), content.animate({
					opacity: 1
				}, {
					queue: !1,
					duration: 200,
					complete: function() {}
				})
			}, 50);
			else if("success" == $.trim(returnData.state) && !0 === returnData.refresh) {
				if(/^(http|https).+$/.test(returnData.referer)) return window.location = returnData.referer, !0;
				$.trim(returnData.referer) ? window.location = target = common_conf.baseURL + $.trim(returnData.referer) : checkURL()
			}
		}
	})
}
checkURL(), $(window).on("hashchange", function() {
	checkURL()
});

function active(_url) {
	$(".loadNav ul li a").each(function() {
		$(this).attr("href") == "#" + _url && ($(this).parent("li").addClass("active"), $(this).parent("li").siblings("li").removeClass("active"))
	})
}