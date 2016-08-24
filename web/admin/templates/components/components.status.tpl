<div class="absolute bottom-0 p15-grid left-0 weight-500 full-x m20y text-center txt-7 flex-wrap-center">
    <div> {{section}}, {{name}}, {{version}} </div>
    <ul class='txt-white'>
        <li> File Name {{metadata.filename}} </li>
        <li> Versions {{metadata.versions}} </li>
    </ul>
    <div class='opacity-30p text-1 weight-300 full-x flex-wrap-center'>
    <!-- Full Object from component.json-->
        {{metadata}}
    </div>
</div>