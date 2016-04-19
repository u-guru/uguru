angular
.module('sharedServices')
.factory("FileService", [
  'LoadingService',
  'Restangular',
  'DevToolService',
  FileService
	]);

function FileService(LoadingService, Restangular, DevToolService) {
    var DropzoneDict = {}
    var dropZoneUiEvents = ['drop', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave']; //event first param
    var dropZoneFileEvents = ["totaluploadprogress", "queuecomplete", "maxfilesreached", "complete", "success", "uploadprogress", "thumbnail"]
    return {
        initRequestDropzoneFromSelector: initRequestDropzoneFromSelector,
        initMessageDropzone: initMessageDropzone,
        DropzoneDict: DropzoneDict,
        initUserAdminTool: initUserAdminTool,
        getS3JsonFile: getS3JsonFile,
        postS3JsonFile: postS3JsonFile
    }

    function initUserAdminTool() {

        return {
            //gets all files
            get: getAllAdminFiles(),
            save: {
                file: saveAdminFile,
                folder: saveAdminFolder
            },
            create: {
                folder: createAdminFolder,
                file: createAdminFile
            },
            remove: {
                folder: removeAdminFolder,
                file: removeAdminFile
            }
        }
    }

    function getUserSettings(user_name) {
        //last_file_opened
        //last_10_files_edited
        //variations
        //--previous fork reference
    }




    function getAllAdminFiles() {
        return function(_scope) {
            Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('files').get().then(
            function(response) {
                var files = response.plain().admin_files;
                _scope.files = {
                    users: {options: Object.keys(files), index:0},
                    all: files,
                    switchUser: function(user) {
                        return
                    }
                }
                var splash_files = [];
                var user_name = _scope.user.name.split(' ')[0].toLowerCase();
                if (user_name === "asif") {
                    user_name = 'samir';
                }

                for (var i = 0; i < files[user_name].files.length; i++) {
                    var indexFile = files[user_name].files[i];
                    if (indexFile.name && indexFile.name.indexOf('layouts/splash.json') > -1) {
                        splash_files.push(indexFile);
                    }
                }

                // _scope.current_file = splash_files[0];
                // console.log(_scope.current_file);
                var xhr = new XMLHttpRequest();
                xhr.open( 'GET', splash_files[0].url, true );

                xhr.onload = function () {
                    var resp = window.JSON.parse( xhr.responseText );
                    console.log(indexFile.name, resp)
                    resp.full_template_url = splash_files[0].url;
                    console.log(resp.full_template_url);
                    DevToolService.initCurrentFile(_scope, resp);
                    _scope.status.show = false;
                };
                xhr.send();
            })
        }

    }
    function removeAdminFolder () {return};
    function removeAdminFile () {return};
    function createAdminFile () {return};
    function createAdminFolder () {return};
    function saveAdminFile () {return};
    function saveAdminFolder () {return};

    function sceneState() {
        function autoInit() {
        }
        function goNext() {

        }
        function triggerScene() {

        }
    }

    function variationUtility () {
        function promote() {
        }
        function fork() {
        }
    }
    function updateUserSettings() {
        return {
        }
        //takes a recent edited component obj &&
        function updateRecentlyEditedComponents() {

        }
    }

    function initMessageDropzone(scope) {
        var dropzoneElem = new Dropzone('#message-dropzone', getDefaultRequestDropzone());
        dropzoneElem.on("addedfile", function(file) {
                console.log('user added file', file);
            });

            dropzoneElem.on("success", function(file, server_response) {
                console.log('file successfully sent', server_response);
                var messagePayload = {
                    message: {
                        relationship_id: scope.active_relationship.id,
                        session_id: scope.active_relationship.sessions[scope.active_relationship.sessions.length - 1].id,
                        sender_id: scope.user.id,
                        file_id: server_response.id
                    }
                }
                if (scope.active_relationship.guru.id !== scope.user.id) {
                    messagePayload.receiver_id = scope.active_relationship.guru.id;
                } else {
                    messagePayload.receiver_id = scope.active_relationship.student.id;
                }
                scope.user.createObj(scope.user, 'messages', messagePayload, scope);
            })


            dropzoneElem.on("sending", function(file, xhr, data) {
                if (scope.user && scope.user.id) {
                    data.append("user_id", scope.user.id);
                }
                data.append("filename", file.name);
                data.append("filesize", file.size);
                data.append("filetype", file.type);
            });
            dropzoneElem.on("error", function(file, errorMessage, xml_error) {
                var fileExtension;
                fileNameSplit = file.name.split('.')
                if (fileNameSplit.length === 1) {
                    LoadingService.showMsg('Sorry, we no longer can accept unknown file types, please add an extension to the file or submit another one.', 5000)
                    return;
                } else {
                    fileExtension = fileNameSplit.slice(-1)[0];
                    LoadingService.showMsg('Sorry, we no longer can accept bare .' + fileExtension + ' file types, please either compress & resubmit or submit another file type.', 5000)
                }
                console.log('file has error', file, errorMessage, xml_error);
            })

            dropzoneElem.on("uploadprogress", function(file, progress, bytesSent) {
                console.log('progress-update:', progress, '+ bytes sent:', bytesSent);
            })
        return dropzoneElem;
        // Dropzone.options.messageDropzone = {
        //   paramName: "file", // The name that will be used to transfer the file
        //   maxFilesize: 2, // MB
        //   accept: function(file, done) {
        //     if (file.name == "justinbieber.jpg") {
        //       done("Naha, you don't.");
        //     }
        //     else { done(); }
        //   },
        //   init: function() {
        //     this.on("addedfile", function(file) {
        //         console.log('user added file', file);
        //     });
        //   }
        // };
    }

    function initRequestDropzoneFromSelector(elem_selector, scope) {
        if (elem_selector && !DropzoneDict[elem_selector]) {
            console.log('initializing');
            var dropzoneElem = new Dropzone(elem_selector, getDefaultRequestDropzone());
            //stor in global
            DropzoneDict[elem_selector] = dropzoneElem;

            //init event listeners
            //full docs are here http://www.dropzonejs.com/#event-list
            dropzoneElem.on("addedfile", function(file) {
                console.log('user added file', file);
            });
            dropzoneElem.on("removedfile", function(file) {
                console.log('user removed file', file);
                if (scope.requestForm && scope.requestForm.files && scope.requestForm.files.length) {
                    for (var i = 0; i < scope.requestForm.files.length; i++) {
                        var indexRequestFile = scope.requestForm.files[i];
                        if (indexRequestFile.name === file.name) {
                            var removedFile = scope.requestForm.files.splice(i, 1);
                            scope.$apply();
                            console.log('file moved from request list', removedFile);
                        }
                    }
                }
            });
            dropzoneElem.on("success", function(file, server_response) {
                console.log('file successfully sent', server_response);
                console.log(dropzoneElem.options);
                if (scope.requestForm && scope.requestForm.files) {
                    scope.requestForm.files.push(server_response);
                    scope.root.vars.getUserFromServer(scope);
                }
            })


            dropzoneElem.on("sending", function(file, xhr, data) {
                if (scope.user && scope.user.id) {
                    data.append("user_id", scope.user.id);
                }
                data.append("filename", file.name);
                data.append("filesize", file.size);
                data.append("filetype", file.type);
            });
            dropzoneElem.on("error", function(file, errorMessage, xml_error) {
                var fileExtension;
                fileNameSplit = file.name.split('.')
                if (fileNameSplit.length === 1) {
                    LoadingService.showMsg('Sorry, we no longer can accept unknown file types, please add an extension to the file or submit another one.', 5000)
                    return;
                } else {
                    fileExtension = fileNameSplit.slice(-1)[0];
                    LoadingService.showMsg('Sorry, we no longer can accept bare .' + fileExtension + ' file types, please either compress & resubmit or submit another file type.', 5000)
                }
                console.log('file has error', file, errorMessage, xml_error);
            })

            dropzoneElem.on("uploadprogress", function(file, progress, bytesSent) {
                console.log('progress-update:', progress, '+ bytes sent:', bytesSent);
            })
        }
    }

    function dragzoneOnDrop() {

    }

    function getS3JsonFile(first_name, url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open( 'GET', url, true );

        xhr.onload = function () {
            var resp = window.JSON.parse( xhr.responseText );
            cb && cb(first_name, resp);
        };
        xhr.send();
    }

    function postS3JsonFile(data, first_name, url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open( 'PUT', url, true );
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onload = function () {
            console.log(xhr.status)
            var resp =  xhr.responseText;
            cb && cb(first_name, resp);
        };
        xhr.send(data);
    }

    function getDefaultRequestDropzone(elem) {
        return {
                    previewTemplate: document.getElementById('dz-preview-template').innerHTML,
                    url: REST_URL + '/api/v1/files',
                    method: "POST",
                    paramName: "file",
                    maxFilesize: 10,
                    addRemoveLinks: true,
                    uploadMultiple: false,
                    acceptedFiles: "image/*, application/pdf, audio/*, text/*, video/*, application/zip, audio/*, application/powerpoint, application/msword, application/rtf",
                    clickable: true,
                    createImageThumbnails: true,

                }
    }

}