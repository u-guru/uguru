<div class="checkbox-container">
    <div>
        <input type="checkbox" ng-model="value" ng-change="onValueChanged(value)">
        <span>
            <svg viewBox="0 0 100 100">
                <path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
            </svg>
        </span>
    </div>
    <label ng-if="label">{{label}}</label>
</div>