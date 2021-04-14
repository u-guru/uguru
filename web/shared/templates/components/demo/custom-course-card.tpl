<div class="course-card"
        u init-with="p:[opacity:0]"
        error
        on-init="s:[course-card-init:children:150, course-scoop:self]"
        when-course-scoop="a:[scoop-enter:900:linear:0:1:f]">
    <svg width="{{width}}" height="{{height}}" viewBox="0 0 240 150">
        <rect x="0" y="0" width="240" height="150" fill="none"></rect>
    </svg>
    <div class="course-card-inside"
        u init-with="p:[opacity:0, tro:center center]"
        when-course-card-init="a:[bounceInUp-subtle:1000:linear:150:1:f]">
        <h2 style="color: {{color}};">BIO 1A</h2>
        <h1 style="color: {{color}};">Introduction to Biology</h1>
    </div>
    <div class="course-card-border" style="background: #003262;"
        u init-with="p:[transform:scaleX(0), transform-origin:center center]"
        when-course-card-init="a:[scaleX:0:1:250:easeOutSine:0:1:f]"></div>
</div>