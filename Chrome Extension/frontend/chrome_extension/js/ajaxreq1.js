$.ajax({
    url: "http://127.0.0.1:8000/curr_session/",
    type: "GET",
    data: {user_id: 0},
    success: function(resp){
      sendResponse(resp)
    }
});
