var myFeeds = [];
var loginName = "";

window.fbAsyncInit = function () {
    FB.init({
        appId: '926578834514927',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

function testAPI() {
    console.log('Welcome! Fetching your information....');
    FB.api('/me', function (response) {
        loginName = response.name;
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {      // logged in
        $("#login-btn").hide();                 // hide login button
        testAPI();
        loadMyFeeds();
    } else {                                    // not logged in
        $("#login-btn").show();                 // show login button
        document.getElementById('status').innerHTML = 'Please log into this webpage.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function loadMyFeeds() {
    console.log('loading my feeds');
    FB.api(
        "me/feed?fields=attachments{media},message",
        function (response) {
            if (response && !response.error) {
                console.log(response);
                processMyFeedResponse(response);
            } else {
                console.error(response.error);
            }
        }
    );
}

function processMyFeedResponse(response) {
    for (var key of Object.keys(response.data)) {
        var postContent = [];

        postContent.id = response.data[key].id;
        postContent.name = loginName;
        postContent.imageLabels = ["red", "green", "blue"]; // dummy data

        if(response.data[key].message) {
            postContent.text = response.data[key].message;
        }

        if(response.data[key].attachments){
            var attachments = response.data[key].attachments;
            if(attachments.data[0].media && attachments.data[0].media.image) {
                postContent.image = attachments.data[0].media.image.src;
            }
        }
        
        // clean up live data - do not include empty posts
        if(postContent.text && postContent.image) {
            myFeeds.push(postContent);
        }
    }

    // dummy data in case of login failed
    if(!myFeeds.length) {
        myFeeds = dummyData.feeds;
    }
    
    console.log(myFeeds);
}
