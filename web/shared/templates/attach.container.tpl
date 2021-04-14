<div width='100' height='100' column nowrap>
  <div column grow='4' nowrap bg='slate' x='center' y='center' ng-if='files.ready' >
    <!-- <div width='50%' x='center' y='center' basis='50%'  bg='shamrock'
    pointer

    ngf-pattern="image/*,audio/*,video/*,directory"
    ngf-drag="files.func.onDrag($isDragging, $class, $event)"
    ngf-before-model-change="files.func.onChange($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event)"
    ngf-drop="files.func.uploadFilesToServer($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event)"

    ng-model="files.selected"


    ngf-drop-disabled="files.disable.drop"

    ngf-multiple="true"
    ngf-allow-dir="true"
    ngf-include-dir="true"

    ngf-fix-orientation="true"
    ngf-capture="'camera'"

    ngf-validate="files.func.validateFile($file)"

    ngf-max-total-size="'100MB'"
      class="drop-box" ngf-drop-available="dropAvailable">
      <span ng-show="dropAvailable"> or Drop File</span>
    </div> -->
    <div width='50%' x='center' y='center' basis='50%'  bg='shamrock'
    ng-model="files.selected"
    ngf-model-invalid="files.invalid"
    ngf-drop
    ngf-multiple="files.multiple" ngf-pattern="files.pattern" ngf-accept="files.acceptSelect"
                 ng-disabled="files.disabled" ngf-capture="files.capture"
                 ngf-drag-over-class="files.dragOverClassObj"
                 ngf-validate="files.func.validateFile($file)"
                 ngf-include-dir='true'
                 ngf-resize="files.resizeObj"
                 ngf-change="files.func.onChange($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event)"
                 ngf-resize-if="files.resizeIfFn($file, $width, $height)"
                 ngf-dimensions="files.dimensionsFn($file, $width, $height)"
                 ngf-duration="files.durationFn($file, $duration)"
                 ngf-keep="files.keepDistinct ? 'distinct' : files.keep"
                 ngf-fix-orientation="files.orientation"
                 ngf-max-files="files.maxFiles"
                 ngf-ignore-invalid="files.ignoreInvalid"
                 ngf-run-all-validations="files.runAllValidations"
                 ngf-allow-dir="files.allowDir" class="drop-box" ngf-drop-available="files.dropAvailable">
                 Drop File
  </div>
  <div column width='100' grow='1' bg='charcoal' ngf-select ngf-validate="files.func.validateFile($file)" ng-model="files" ngf-multiple="true" ngf-include-dir='true' pointer>
    <ul>
      <li ng-repeat='file in files.selected'>
        {{file.name}}
      </li>
    </ul>
  </div>
</div>
</div>

        <!-- <div ngf-src="file" //To preview the selected file, sets src attribute to the file data url.
  *ngf-background="file" //sets background-image style to the file data url.
  ngf-resize="{width: 20, height: 20, quality: 0.9}" // only for image resizes the image before setting it
             // as src or background image. quality is optional.
  ngf-no-object-url="true or false" // see #887 to force base64 url generation instead of object url. Default false
>
        <ul width='100' row nowrap f-w='900'>
          <li grow='1'> Name </li>
          <li grow='1'> type </li>
          <li grow='1'> file path </li>
        </ul>
        <ul width='100' row nowrap>
          <li grow='1'> {{file.name}} </li>
          <li grow='1'> {{file.type}} </li>
          <li grow='1'> {{file.path}} </li>


      </li>
    </ul>
  </div>
</div>

     <div top='0' left='0' width='100' height='100'>
        <div grow='3' row nowrap width='100' bg='cerise' max-height='25%'>
          <form name="myForm">
            <fieldset>
              <legend>Upload on form submit</legend>
              Username: <input type="text" name="userName" ng-model="username" size="39" required="">
              <i ng-show="myForm.userName.$error.required">*required</i><br>
              Profile Picture: <input type="file" ngf-select="" ng-model="picFile" name="file" ngf-accept="'image/*'" required="">
              <i ng-show="myForm.file.$error.required">*required</i>
              <br>

              <button ng-disabled="!myForm.$valid" ng-click="uploadPic(picFile)">Submit</button>
              <img ngf-src="picFile" class="thumb">
              <span class="progress" ng-show="picFile.progress >= 0">
                  <div style="width:{{picFile.progress}}%" ng-bind="picFile.progress + '%'" class="ng-binding"></div>
              </span>
              <span ng-show="picFile.result">Upload Successful</span>
            </fieldset>
            <br>
          </form>
        </div>
        <fieldset grow='3' width='100'>
          <legend>Play with options</legend>
          <div class="up-buttons">
            <div ngf-select="" ngf-drop="" ng-model="files" ngf-model-invalid="invalidFiles" ngf-model-options="modelOptionsObj" ngf-multiple="multiple" ngf-pattern="pattern" ngf-accept="acceptSelect" ng-disabled="disabled" ngf-capture="capture" ngf-drag-over-class="dragOverClassObj" ngf-validate="validateObj" ngf-resize="resizeObj" ngf-resize-if="resizeIfFn($file, $width, $height)" ngf-dimensions="dimensionsFn($file, $width, $height)" ngf-duration="durationFn($file, $duration)" ngf-keep="keepDistinct ? 'distinct' : keep" ngf-fix-orientation="orientation" ngf-max-files="maxFiles" ngf-ignore-invalid="ignoreInvalid" ngf-run-all-validations="runAllValidations" ngf-allow-dir="allowDir" class="drop-box" ngf-drop-available="dropAvailable">Select File
              <span ng-show="dropAvailable"> or Drop File</span>
            </div>
            <br>

          </div>
          <div class="custom">
            <label>accept (for select browser dependent): <input type="text" ng-model="acceptSelect"></label><br>
            <label>ngf-capture (for mobile): <input type="text" ng-model="capture"></label><br>
            <label>ngf-pattern (validate file model): <input type="text" ng-model="pattern"></label><br>
            <label>ngf-validate: <input type="text" ng-model="validate" size="49"></label><br>
            <label>ngf-drag-over-class (chrome): <input size="31" type="text" ng-model="dragOverClass"></label><br>
            <label>ngf-model-options: <input type="text" size="43" ng-model="modelOptions"></label><br>
            <label>ngf-resize: <input type="text" size="43" ng-model="resize"></label><br>
            <label>ngf-resize-if: <input type="text" size="43" ng-model="resizeIf"></label><br>
            <label>ngf-dimensions: <input type="text" size="43" ng-model="dimensions"></label><br>
            <label>ngf-duration: <input type="text" size="43" ng-model="duration"></label><br>
            <label>ngf-max-files: <input type="text" size="43" ng-model="maxFiles"></label><br>
            <label>ngf-ignore-invalid: <input type="text" size="43" ng-model="ignoreInvalid"></label><br>
            <label><input type="checkbox" ng-model="multiple">ngf-multiple (allow multiple files)</label>
            <label><input type="checkbox" ng-model="disabled">ng-disabled</label><br>
            <label><input type="checkbox" ng-model="allowDir">ngf-allow-dir (allow directory drop Chrome
              only)</label><br>
            <label><input type="checkbox" ng-model="keep">ngf-keep (keep the previous model values in
              ng-model)</label><br>
            <label><input type="checkbox" ng-model="keepDistinct">ngf-keep="distinct" (do not allow
              duplicates)</label><br>
            <label><input type="checkbox" ng-model="orientation">ngf-fix-orientation (for exif jpeg files)</label><br>
            <label><input type="checkbox" ng-model="runAllValidations">ngf-run-all-validations</label><br>
            <label>Upload resumable chunk size: <input type="text" ng-model="chunkSize"></label><br>
          </div>

          <div class="preview">
            <div>Preview image/audio/video:</div>
            <img ngf-src="!files[0].$error && files">
            <audio controls="" ngf-src="!files[0].$error && files[0]"></audio>
            <video controls="" ngf-src="!files[0].$error && files[0]"></video>
          </div>
        </fieldset>
        <br>
      </div>
 -->