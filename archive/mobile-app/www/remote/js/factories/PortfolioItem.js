angular.module('uguru.rest')
.factory('PortfolioItem', ['Restangular', 'Category', 'LoadingService', '$timeout',
    function(Restangular, Category, LoadingService, $timeout) {
    var editModal;
    var PortfolioItem = {
        initEmpty:initEmpty,
        createObjSuccess: createObjSuccess,
        linkEditModal: linkEditModal,
        editModal: editModal,
        validateFields: validateFields
    }

    return PortfolioItem;

    function createObjSuccess() {
        // if (modalElem) {
            // $timeout(function() {
            //     modalElem.classList.remove('show');
            // }, 500)
        // }
        LoadingService.showSuccess('Saved!', 1500);
    }

    function linkEditModal(selector) {
        var modalElem = document.querySelector(selector);
        if (modalElem) {
            editModal = modalElem;
        }
    }

    function validateFields(pi_obj) {
        if (!pi_obj.course || !pi_obj.course.id) {
            LoadingService.showMsg('Please add a course to complete', 2000);
            return false
        }
        else if (!pi_obj.description || !pi_obj.description.length) {
            LoadingService.showMsg('Please add a small short background description', 2000);
            return false;
        }

        return true;
    }

    function initEmpty(shop_type) {

        return {
            course: {},
            shop_category: Category.getAcademic(),
            shop_id: 1,
            title: '',
            hourly_price: 10,
            max_hourly_price: 25,
            description: "",
            avg_rating: 0,
            unit_price: 5,
            active: true,
            max_unit_price:10,
            admin_approved: true,
            files: [],
            tags: [{name:"", placeholder:"tap to edit"}],
            orig_tag: {name:"", placeholder:"tap to edit"}
        }
    }

    // time_created = Column(DateTime)

    // is_custom = Column(Boolean)
    // admin_approved = Column(Boolean, default=False)

    // skill_id = Column(Integer, ForeignKey('skill.id'))
    // skill = relationship("Skill", uselist=False)

    // course_id = Column(Integer, ForeignKey('course.id'))
    // course = relationship("Course", uselist=False)

    // subcategory_id = Column(Integer, ForeignKey('subcategory.id'))
    // subcategory = relationship("Subcategory", uselist=False)

    // description = Column(String)
    // title = Column(String)

    // avg_rating = Column(Float)

    // hourly_price = Column(Float, default = 10)
    // max_hourly_price = Column(Float, default = 0)

    // unit_price = Column(Float)
    // max_unit_price = Column(Float)

    // title = Column(String)
    // description = Column(String)




}]);