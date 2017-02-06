angular.module('uguru.shared.controllers')
// angular.module('uguru.shared.controllers')
.controller('AttachFileContainerController', [

  //All imported packages go here
  '$scope',
  '$attrs',
  '$element',
  '$timeout',
  '$parse',
  'Upload',
  'XHRService',
  function($scope, $attrs, $element, $timeout, $parse, Upload, XHRService) {

    var files = this;

    if (!$element[0].hasAttribute('file-container-processed')) {
      $element[0].setAttribute('file-container-processed', true);
    } else {

      console.log('yo',$attrs)
    }


    files.upload = uploadFilesToS3;
    // files.func = {};
    initFilesBaseObjAndEvents(files, {drag: true})

    initFileContainerWithConfig(files, $scope, $element, $attrs);
    $scope.fileContainerProcessed = true;


    function initFilesBaseObjAndEvents(_files, type) {
      _files.func = {};
      _files.selected = [];
      _files.invalid = [];
      _files.capture = 'camera';
      _files.pattern = 'image/*,audio/*,video/*,directory';
      _files.acceptSelect = 'image/*,audio/*,video/*,directory';
      _files.modelOptions = '{debounce:100}';
      _files.dragOverClass = '{accept:\'dragover\', reject:\'dragover-err\', pattern:\'image/*,audio/*,video/*,text/*\'}';
      _files.disabled = false;
      _files.multiple = true;
      _files.allowDir = true;
      _files.validate = '{size: {max: \'20MB\', min: \'10B\'}, height: {max: 12000}, width: {max: 12000}, duration: {max: \'5m\'}}';
      _files.keep = false;
      _files.keepDistinct = false;
      _files.orientation = false;
      _files.runAllValidations = false;
      _files.resize = "{width: 1000, height: 1000, centerCrop: true}";
      _files.resizeIf = "$width > 5000 || $height > 5000";
      _files.dimensions = "$width < 12000 || $height < 12000";
      _files.duration = "$duration < 10000";
      _files.maxFiles = "500";
      _files.ignoreInvalid = "";

        _files.func.onDrag = function($isDragging, $class, $event) {
          $isDragging && onDragEnterDropZone($event, _files) || onDragLeaveDropZone($event, _files);
        }
        _files.func.onChange = function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
          // console.log($event.type)
          if ($event.type === 'drop') {
            uploadFilesToS3($files, formatPolicyObj($scope.view.data.policy));
          }
          // $files.forEach(function(file, i) {
          //   console.log(file)
          // })
          // console.log($files, $scope.view.data.policy)
        };

        _files.func.validateFile = function($file) {
          console.log(' validating', $file.name, Object.keys($file))
          return true;
        }


        _files.ready = true;

        return _files
    }


    function onDragEnterDropZone($event, _files) {

    }

    function onDragLeaveDropZone($event, _files) {

    }

    function onDragEnterDropZone($event) {

    }

    function uploadFilesToS3(files, service_policy) {
        files.forEach(function(file) {
          uploadSingleFile(file, service_policy)
        })
    }

    function uploadSingleFile(file, policy) {
      console.log('uploading..ay', policy)
      Upload.upload({
        url:"https://s3-us-west-1.amazonaws.com/users.ui.guru", //S3 upload url including bucket name
        method: 'POST',
        data: {
            key: ('users/cfbd5d8f2d3b1f2d725db540225c1a3b/files/' + file.name || 'uploads/'),// + file.path, // the key to store the file on S3, could be file name or customized
            AWSAccessKeyId: policy.AWSAccessKeyId,
            acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
            policy:policy.policy,//"eyJjb25kaXRpb25zIjogW3siYnVja2V0IjogInVzZXJzLnVpLmd1cnUifSwgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLCB7ImFjbCI6ICJwcml2YXRlIn0sIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdXSwgImV4cGlyYXRpb24iOiAiMjAxNy0wMS0yMFQxODoxMzowMDBaIn0=", // base64-encoded json policy (see article below)
            signature: policy.signature,//"+JbOmRA=", // base64-encoded signature based on policy string (see article below)
            "Content-Type": (file.type != '') ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
            filename: file.name, // this is needed for Flash polyfill IE8-9
            file: file
        }
      }).then(function (resp) {
            console.log('Success ' + resp.config + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status, resp, file.name);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }

    function formatPolicyObj(policy) {
      var result = {};
      console.log(policy);

      return {
        signature: policy.signature,
        policy: policy.policy,
        bucket: policy.bucket_url,
        AWSAccessKeyId: policy.AWSAccessKeyId
      }
    }

    function initFileContainerWithConfig(files_obj, scope, elem, attr) {


        var s3_obj = files_obj;

        if (!('policy' in attr)) {
            s3_obj.bucket_name = s3_obj.bucket || 'users.ui.guru';
            s3_obj.user_id = s3_obj.user_id || 'cfbd5d8f2d3b1f2d725db540225c1a3b';
            function s3Callback(response) {
                s3_obj.response = response;

            }
            XHRService.getJSONFile('GET', 'http://localhost:5001/api/v1/users.ui.guru/cfbd5d8f2d3b1f2d725db540225c1a3b/' + s3_obj.bucket_name + '/' + s3_obj.user_id, s3Callback, {}, false, {gzip: true})
            return s3_obj;
        } else {

            var cancelWatcher = scope.$watch('view.data.policy', function(value) {
                if (value && typeof value === 'object') {
                    files_obj.policy = value;
                    cancelWatcher();
                }
            })
        }
    }

  }
]);

