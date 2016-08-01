<div class="projector-slide">
    <svg class="projector-line" width="2px" height="196px" viewBox="0 0 4 392">
        <path d="M2,2 L2,392" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6" stroke-linejoin="round" stroke-dasharray="16,14"></path>
    </svg>
    <div class="projector-top"></div>
    <div class="projector-content projector-account">
        <div class="projector-guru">
            <div class="guru-head" ng-include="root.base_url + 'shared/templates/components/svg/logo/guru-head.html'"></div>
            <svg class="coach active" on-init="opacity:0" width="114px" height="98px" viewBox="0 0 228 196">
                 <path d="M48.386161,159.590945 C48.3861609,159.590943 47.5065944,177.922187 23.5796634,188.938294 C63.1658208,201.858782 77.415256,186.935364 86.5812235,178.667782 C146.539697,198.23757 207.421447,176.150125 222.564419,129.334091 C237.707391,82.518058 201.37725,28.7017162 141.418777,9.13192771 C81.4603034,-10.4378608 20.578553,11.6495847 5.43558085,58.4656181 C-6.12740226,94.2137525 12.3218247,134.043527 48.386161,159.590945 L48.386161,159.590945 L48.386161,159.590945 Z" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" fill="#40484B"></path>
                <text transform="translate(116.193148, 94.776332) rotate(24.000000) translate(-116.193148, -94.776332) " font-family="Source Sans Pro" font-size="40" font-weight="normal" line-spacing="40" fill="#FFFFFF" ng-if='!user.demographic'>
                    <tspan x="48.6931477" y="93.7763318">who are</tspan>
                    <tspan x="76.2331477" y="133.776332">you?</tspan>
                </text>
            </svg>
        </div>
        <div class="projector-account-content projector-signup absolute top-0 left-0 full-xy" ng-transclude>
        </div>
    </div>
</div>