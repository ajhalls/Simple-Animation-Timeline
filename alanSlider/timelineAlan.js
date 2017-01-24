$( document ).ready(function() {
    //width could be any value such as milliseconds
    var width = $(".timeline-container").width();
    var ZoomValue = 1;
    function drawRulers() {
    $(".timelineTicks").html("");
    $(".timelineNumbers").html("");
        for (i = 0; i < width; i += (10 * 1)) {
            var spacing = (i*Number(ZoomValue));
            var tickMarks = "<span  style=\"position:absolute;width:2px;height:10px;left:"+ spacing +"px;\">|</span>";
            $(".timelineTicks").append(tickMarks);
        }
        // Numbers and red lines
        for (i = 0; i < width;  i += (100 * 1)) {
            var spacing = (i*Number(ZoomValue)-2);
            var numbers = "<span  style=\"position:absolute;width:2px;height:15px;font-size:9px;top:-10px;left:"+ spacing +"px;\">"+ i +"</span>";
            $(".timelineNumbers").append(numbers);
            var majorLines = "<span  style=\"position:absolute;width:3px;height:20px;color:#f00;font-size:20px;top:-6px;left:"+ spacing +"px;\"><b>|</B></span>";
            $(".timelineTicks").append(majorLines);
            $(".timeline-container-header").css("width", i*ZoomValue+150);
        }
    }

    $(".timeline-container").on("wheel", mouseZoom);

    function mouseZoom(e) {
        var dir = e.originalEvent.deltaY;
        if (dir < 0){
        ZoomValue = (ZoomValue += 1.02);           
        } else {
        ZoomValue = (ZoomValue -= 0.083);
        }

            drawRulers();
                e.originalEvent.returnValue = false;
    };

    drawRulers();

    $(".scrubber-icon").draggable({ 
        axis: 'x',
        containment: "parent",
        drag: function( event, ui ) {
            var scrubberValue = ($(".scrubber-icon").position().left-15)/ZoomValue;
            console.log(scrubberValue);
            $(".scrubber-icon").css("after", "height", "20px")
        }

    });

    /*
    This is just to get the scrubber moving 
    */
    function playTimeline() {
        var i;
        for (i = 0; i < 1000; i++) {
            movement(i);
        }
    }   
    function movement(i) {
        setTimeout(function() {$(".scrubber-icon").css("left", i*ZoomValue +"px")}, i);
    }

    

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
    $(".playAnimation").on("click", function(){
    $(".scrubber-icon").css("left", "0px");
     playTimeline();   
    $('.exampleAnimation').animateCss('bounce');
    });

    

})
