
<div class="course-card with-hover">
    <svg width="240px" height="150px" viewBox="0 0 240 150">
        <rect x="0" y="0" width="240" height="150" fill="none"></rect>
    </svg>
    <div class="course-card-inside">
        <h2 style="color: #003262;">{{course.name || 'BIO1A'}}</h2>
        <h1 style="color: #003262;">{{course.full_name || 'Introduction to Biology'}}</h1>
    </div>
    <div class="course-card-hover" tabindex>
        <span style="background: #003262;"></span>
        <div style='color:#FFFFFF !important;' class='absolute'>
            {{course.description || 'Content can go in here.'}}
        </div>
    </div>
    <span class="course-card-count">
        <span style="background: #003262;"></span>
        <svg viewBox="0 0 100 100">
            <path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
        </svg>
    </span>
    <div class="course-card-border" style="background: #003262;"></div>
</div>