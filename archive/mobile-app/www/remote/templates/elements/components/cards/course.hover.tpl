<div class="course-card with-hover">
    <svg width="240px" height="150px" viewBox="0 0 240 150">
        <rect x="0" y="0" width="240" height="150" fill="none"></rect>
    </svg>
    <div class="course-card-inside">
        <h2 style="color: {{course.color}};">{{course.name || 'BIO1A'}}</h2>
        <h1 style="color: {{course.color}};">{{course.full_name || 'Introduction to Biology'}}</h1>
    </div>
    <div class="course-card-hover" tabindex>
        <span style="background: {{course.color}};"></span>
        <div>
            {{course.description || 'Content can go in here.'}}
        </div>
    </div>
    <div class="course-card-border" style="background: {{course.color}};"></div>
</div>