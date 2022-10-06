$(document).ready(function() {
    $('.sitemap > .hamburger').click(function () {
        $(".offcanvas-backdrop").show();
        $(".offcanvas").addClass('animate__fadeInRight').show();
    });

    $('.offcanvas-off').click(function () {
        $(".offcanvas").addClass('animate__fadeOutRight');
        $(".offcanvas-backdrop").hide();
    });

    $(".offcanvas").on('animationend', function (){
        if ($(".offcanvas").hasClass('animate__fadeOutRight')) {
            $(".offcanvas").hide();
        }
        $(".offcanvas").removeClass('animate__fadeInRight');
        $(".offcanvas").removeClass('animate__fadeOutRight');
    });
});