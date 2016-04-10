angular
.module('sharedServices')
.factory("FileService", [
  'LoadingService',
  'Restangular',
  FileService
	]);

function FileService(LoadingService, Restangular) {
    var DropzoneDict = {}
    var dropZoneUiEvents = ['drop', 'dragstart', 'dragend', 'dragenter', 'dragover', 'dragleave']; //event first param
    var dropZoneFileEvents = ["totaluploadprogress", "queuecomplete", "maxfilesreached", "complete", "success", "uploadprogress", "thumbnail"]
    return {
        initRequestDropzoneFromSelector: initRequestDropzoneFromSelector,
        initMessageDropzone: initMessageDropzone,
        DropzoneDict: DropzoneDict,
        initUserAdminTool: initUserAdminTool
    }

    function initUserAdminTool($scope) {

        return {
            get: getAllAdminFiles($scope),
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


    function getAllAdminFiles($scope) {
        return function() {
            Restangular.one('admin', '9c1185a5c5e9fc54612808977ee8f548b2258d34').one('files').get().then(
            function(response) {
                var files = response.plain().admin_files;
                $scope.files = {
                    users: {options: Object.keys(files), index:0},
                    all: files,
                    switchUser: function(user) {
                        return
                    }
                }
                var splash_files = [];
                for (var i = 0; i < files.samir.files.length; i++) {
                    var indexFile = files.samir.files[i];
                    if (indexFile.name && indexFile.name.indexOf('layouts/splash.json') > -1) {
                        splash_files.push(indexFile);
                    }
                }

                $scope.current_file = splash_files[0];
                console.log($scope.current_file);
                var xhr = new XMLHttpRequest();
                xhr.open( 'GET', $scope.current_file.url, true );

                xhr.onload = function () {
                    var resp = window.JSON.parse( xhr.responseText );
                    $scope.current_file = resp;
                    var variationOptions = resp.variations;
                    $scope.current_file.selected_variation = resp.variations[0];
                    $scope.current_file.selectedIndex = 0;

                    $scope.page.dropdowns.templates = {
                        options: variationOptions,
                        key: 'name',
                        size: 'small',
                        selectedIndex: 0,
                    }
                    $scope.injectTemplateIntoStage(resp.template_url.replace('templates/', ''), resp.controller, resp.ref);
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