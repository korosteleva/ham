$(document).ready( function() {
    checkDataSpans();

    /* for closing popover in mobile */
    $(".vdma-container").on('click', function (event) {
        if ($(event.target).closest(".vdma-container .popover").length) return;
        if ( $(".vdma-container .popover").is(':visible') === true ) {
            $('.vdma-container li#top_menu').trigger('mouseleave');
        }
    });
});
$(window).resize(function() {
    checkDataSpans();
});

function getMode()
{
    var width = $(document).width();
    var mode = 'desktop';
    if ( width >= 751 && width <= 960 ) {
        mode = 'tab';
    } else if ( width >= 464 && width <= 750 ) {
        mode = 'phone';
    } else if ( width <= 463 ) {
        mode = 'xs';
    }

    return mode;
}

function checkDataSpans(){
    var mode = getMode();
    $(".vdma-container").find("[class*='span']")
        .removeClass( function() {
            var toReturn = '',
                classes = this.className.split(' ');
            for(var i = 0; i < classes.length; i++ ) {
                if( /span\d{1,2}/.test( classes[i] ) ) {
                    toReturn += classes[i] +' ';
                }
            }
            return toReturn ;
        })
        .addClass( function() {
            if ( this.hasAttribute('data-' + mode) ) {
                return this.getAttribute('data-' + mode);
            }
            return '';
        });
}

collapsedTabMenuList = {};

function initCollapsedTabMenu(id) {
    var $navHolder = $('#'+id),
        $dropDown = $navHolder.find('li.dropdown ul'),
        menuTabsInfo = [],
        anchor,
        tabs;
    tabs = $navHolder.find('li[role="presentation"]');
    tabs.each(function() {
        anchor = $(this).find('a[role="tab"]');
        menuTabsInfo.push(anchor.attr('href').substr(1));

        var newHiddenTab = $('<li>').append(anchor.clone());
        $dropDown.append(newHiddenTab);
    });
    collapsedTabMenuList[id] = menuTabsInfo;
    console.log(collapsedTabMenuList);
}

function collapseTabMenu(id) {
    var $navHolder = $('#'+id),
        $dropDown = $navHolder.find('li.dropdown'),
        dropDownWidth= 190,
        currentNavWidth = $navHolder.width(),
        currentNavHeight = $navHolder.height(),
        isHidden = $dropDown.is(':visible'),
        defaultHeight = 44;

    if ( currentNavHeight >= defaultHeight && currentNavHeight <= defaultHeight + 10 && isHidden == false ) {
        $dropDown.hide();
    } else {
        var minFittingWidth = dropDownWidth;
        $dropDown.show();
        for (var i in collapsedTabMenuList[id]) if ( collapsedTabMenuList[id].hasOwnProperty(i) ) {
            var obj = $navHolder.find('li[role="presentation"]').find('a#' + collapsedTabMenuList[id][i] + '-tab').parent('li');
            var dropObj = $dropDown.find('a#' + collapsedTabMenuList[id][i] + '-tab').parent('li');

            minFittingWidth += obj.width();
            if (minFittingWidth <= currentNavWidth) {
                obj.show(); dropObj.hide();
                isHidden = false;
            } else {
                obj.hide(); dropObj.show();
                isHidden = true;
            }
        }
        if ( isHidden == false ) {
            $dropDown.hide();
        }
    }
}

function resizeVideo($videoWrapper){
    var mode = getMode();
    if ( mode != 'desktop' ) {
        var height = Math.ceil($videoWrapper.width()*9/16);
        $videoWrapper.css('height', height);
    }
}

function initCarousel(carouselObj) {
    var mode = getMode();
    carouselObj.touchCarousel({
        itemsPerMove: mode == 'desktop' ? 4 : 1,
        pagingNav: mode == 'desktop',
        scrollbar: false,
        directionNavAutoHide: false,
        loopItems: false,
        useWebkit3d: true
    });
}

function resizeCarousel(carouselObj) {
    var mode = getMode();
    var sliderInstance = carouselObj.data("touchCarousel");
     if ( typeof sliderInstance != 'undefined' ) {
         sliderInstance.destroy();
     }
    carouselObj.touchCarousel({
        itemsPerMove: mode == 'desktop' ? 4 : 1,
        pagingNav: mode == 'desktop',
        scrollbar: false,
        directionNavAutoHide: false,
        loopItems: false,
        useWebkit3d: true
    });
}

function resizeGalleryItems($obj) {
	var newHeight = $obj.find('.gallery-item').first().find('img.full_width').height();
	$obj.find('.gallery-item').find('a.item-block').css('height', newHeight);

}