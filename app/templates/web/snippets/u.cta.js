<script>
function addEventListenerToCTABox(box_elem, modal_elem) {
    console.log('this was clicked');
    box_elem.addEventListener('click', function() {

        var closeCTAModal = cta(box_elem, modal_elem, function() {
            modal_elem.classList.add('show');
            console.log(modal_elem.querySelector('.cta-modal-close'));
            modal_elem.querySelector('.cta-modal-close').addEventListener('click', function() {
                modal_elem.classList.remove('show');
                closeCTAModal();
            })
        });
    });
}

function init() {
    var allCTABoxes = document.querySelectorAll('.cta-box') || [];
    var allCTAModels = document.querySelectorAll('.cta-modal') || [];
    for (var i = 0; i < allCTABoxes.length; i++) {
        var indexCTABox = allCTABoxes[i];
        var indexCTAModal = allCTAModels[i];
        addEventListenerToCTABox(indexCTABox, indexCTAModal)

    }
}

setTimeout(function() {
    init();
}, 5000)
</script>