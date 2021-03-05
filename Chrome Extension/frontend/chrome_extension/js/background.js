let user_signed_in = false

const CLIENT_ID = encodeURIComponent('173036201256-g6agsds2b9aj6jphk59n066rrsh7qano.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://cedblebbbaekliknlbbokohfjddpodhi.chromiumapp.org')
const SCOPE = encodeURIComponent('openid');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
const PROMPT = encodeURIComponent('consent');

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let openId_endpoint_url =
        `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&scope=${SCOPE}
&state=${STATE}
&nonce=${nonce}
&prompt=${PROMPT}`;

    console.log(openId_endpoint_url);
    return openId_endpoint_url;
}

if (! user_signed_in) {
  chrome.identity.launchWebAuthFlow({
                'url': create_auth_endpoint(),
                'interactive': true
            }, function (redirect_url) {
                if (chrome.runtime.lastError) {
                    // problem signing in
                } else {
                    let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                    id_token = id_token.substring(0, id_token.indexOf('&'));
                    const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));
                    console.log(user_info)

                    chrome.webNavigation.onCompleted.addListener(function(details) {
                        chrome.tabs.sendMessage(details.tabId, {type: "openModal"});
                    }, {
                        url: [{
                            hostContains: 'reddit.'
                        }],
                    });

                    $.ajax({
                        url: "http://127.0.0.1:8000/new_user/",
                        type: "GET",
                        data: {user_id:user_info.sub},
                        success: function(resp){
                          console.log(resp)
                        }
                    });

                    console.log(user_info.sub)

                    chrome.runtime.onMessage.addListener(
                      function(request, sender, sendResponse) {

                        switch (request.request) {
                          case "info":
                              $.ajax({
                                  url: "http://127.0.0.1:8000/info/",
                                  type: "GET",
                                  data: {user_id:user_info.sub},
                                  success: function(resp){
                                    console.log(resp)
                                    sendResponse(resp)
                                  }
                              });
                            break;

                          case "update":
                              $.ajax({
                                  url: "http://127.0.0.1:8000/update/",
                                  type: "GET",
                                  data: {
                                    user_id: user_info.sub,
                                    session_length: request.session_length,
                                    start_time: request.start_time},
                                  success: function(resp){
                                    console.log(resp)
                                    sendResponse(resp)
                                  }
                              });
                              
                              chrome.tabs.query({}, function(tabs) {
                                var message = {request: "check"};
                                for (var i=0; i<tabs.length; ++i) {
                                    chrome.tabs.sendMessage(tabs[i].id, message);
                                }
                              });
                            break;

                          case "done":
                            $.ajax({
                                url: "http://127.0.0.1:8000/done/",
                                type: "GET",
                                data: {user_id:user_info.sub, done: 1},
                                success: function(resp){
                                  console.log(resp)
                                  sendResponse(resp)
                                }
                            });

                            chrome.tabs.query({}, function(tabs) {
                              var message = {request: "check"};
                              for (var i=0; i<tabs.length; ++i) {
                                  chrome.tabs.sendMessage(tabs[i].id, message);
                              }
                            });
                            break;

                          case "session_ended":
                            $.ajax({
                                url: "http://127.0.0.1:8000/session_end/",
                                type: "GET",
                                data: {user_id:user_info.sub, end_session: 1},
                                success: function(resp){
                                  console.log(resp)
                                  sendResponse(resp)
                                }
                            });
                            chrome.tabs.query({}, function(tabs) {
                              var message = {request: "check"};
                              for (var i=0; i<tabs.length; ++i) {
                                  chrome.tabs.sendMessage(tabs[i].id, message);
                              }
                            });
                            break;

                          case "inject":
                            chrome.tabs.executeScript(sender.tab.id, {
                              file: "video.js",
                              frameId: sender.frameId
                            });
                        }


                        return true
                      }
                    );
                }

            });
          }
