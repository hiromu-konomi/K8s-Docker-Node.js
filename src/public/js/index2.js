$(function(){
//行いたい処理(jQueryの内容)
    $("button").on("click", function(e) {
        console.log(e.target.value)
        console.log('switchFavorite....')
        $.ajax({
            // 通信先ファイル名
            url: `http://localhost:3000/favorites/switch/${e.target.value}`,
            type:'POST',
            // data:{
            //     id:e.target.value
            // },
            //contentType: 'application/json',
        }).done(function( data, textStatus, jqXHR ) {
            //成功
            console.log("成功")
            console.log(JSON.stringify(data))
            if(data) $(`.${e.target.value}`).css('background-color','lightcoral');
            else $(`.${e.target.value}`).css('background-color','lightblue');
        }).fail(function( jqXHR, textStatus, errorThrown) {
            //失敗
            console.log("失敗")
        }).always(function( jqXHR, textStatus) {
            //通信完了
            console.log("通信完了")
        })
    });
});