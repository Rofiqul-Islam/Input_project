var makeCommentFlag = false;
var commentIndex = 0;
var isCommentSectionSelected = 0;

function readOutCommentContent(){

    var comment = dummyData.feeds[contentIndexOfIndividualTab].comments[commentIndex];
    $("#feed-comment").text(comment.name + ": " + comment.text);

    read("This is a comment from" + comment.name);
    read(dummyData.feeds[contentIndexOfIndividualTab].comments[commentIndex].text);
}

function readAllCommentsOptions() {

    var postEndCommentEnterCommand = "Now you have entered in comment section";
    var postEndUpDownCommentCommand = "Press up and down arrow arrow to navigate between comments";
    var postEndCommentFinish = "Press A again to return to the post section";

    read(postEndCommentEnterCommand);
    read(postEndUpDownCommentCommand);
    read(postEndCommentFinish);

}

function makeComment() {
    // var postComment = "You have successfully made a ";
    cancelRead();
    $("#comment-text-field").focus();
    makeCommentFlag = true;
    read("Write a comment and press enter to upload");
    $("#comment-text-field").keypress(function(event) {
        console.log(makeCommentFlag);
        if(makeCommentFlag == true){
            if(event.key == "Enter"){
                $("#comment-button").click();
            }else{
                read(event.key);
            }
        }
    });
}

$("#comment-button").click(function(){
    read($("#comment-text-field").val());
    var postText = $("#comment-text-field").val();

    read("Your comment is uploading");

    $("#comment-text-field").val(null);
    $("#comment-text-field").blur();

    setTimeout(function(){
            beep();
            read("Your comment has been uploaded successfully");
    }, 4000);
    
    makeCommentFlag = false;
    
});