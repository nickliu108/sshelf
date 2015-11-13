$(document).ready(function(){

	function getuploadButton(){
        return $("body").find("#upload-asset input[type=file]");
    }
    
    function uploadBG(file,goto,callback){
        if (typeof file !== 'object') return false;
        console.log(file);
        (function () {
            var formData = new FormData();
                formData.append('file', file);
                console.log(formData);
                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        callback(request.response);
                    }
                }
                request.open('POST', goto);
                request.responseType = 'json';
                
                request.send(formData);
        }());
    }

    function attachImageUploadHander(){
        /*
        getuploadButton().prop("disabled", false);
        getuploadButton().on("change",function(event){
            event.preventDefault();
            var files = event.target.files;
            uploadBG(files[0],"http://localhost:3000/images/images",function(response){
                console.log(response);
            });
        });
        */
    }
    attachImageUploadHander();
});