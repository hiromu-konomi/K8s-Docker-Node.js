$(function(){
//行いたい処理(jQueryの内容)
    $(window).on('load', ()=>{
        //いいね情報確認
        $.ajax({
            // 通信先ファイル名
            url: `http://localhost:3000/tweets/confirmFavorites`,
            type:'GET',
        }).done(function( data, textStatus, jqXHR ) {
            for (let i = 0; i < data.length ; i++ ){
                console.log(data[i])
                $(`.${data[i]}`).css('background-color','lightcoral');
            }
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log("fail")
        }).always(function( jqXHR, textStatus) {
            console.log("always")
        })
        //通知情報確認
        $.ajax({
            url: `http://localhost:3000/tweets/confirmNotification`,
            type:'GET',
        }).done(function( notificationData, textStatus, jqXHR ) {
            console.log("done...")
            console.log(notificationData)
            if (notificationData.result.length !== 0){
                alert(`OOさん宛に${notificationData.result.length}件通知がきています`)
                const msg = notificationData.result[0].content
                for (let i = 0 ; i < notificationData.result.length ; i++){
                    $('#select_menu').append(`<option value="i">${notificationData.result[i].user.name}さんがあなたの投稿にいいねしました</option>`);
                }
            }
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log("fail")
        }).always(function( jqXHR, textStatus) {
            console.log("always")
        })
    })
    //いいねボタン押下時
    $("button").on("click", function(e) {
        console.log(e.target.value)
        console.log('switchFavorite....')
        $.ajax({
            url: `http://localhost:3000/favorites/switch/${e.target.value}`,
            type:'POST',
        }).done(function( data, textStatus, jqXHR ) {
            console.log("done : " + JSON.stringify(data))
            if(data) $(`.${e.target.value}`).css('background-color','lightcoral');
            else $(`.${e.target.value}`).css('background-color','lightblue');
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log("fail")
        }).always(function( jqXHR, textStatus) {
            console.log("always")
        })
    });
    //未読通知確認
    $("#select_menu").on("click", function(e) {
        console.log('switchIsRead...')
        $.ajax({
            url: `http://localhost:3000/favorites/isRead`,
            type:'POST',
        }).done(function( data, textStatus, jqXHR ) {
            console.log('isRead done')
        }).fail(function( jqXHR, textStatus, errorThrown) {
            console.log("fail")
        }).always(function( jqXHR, textStatus) {
            console.log("always")
        })
    });
});