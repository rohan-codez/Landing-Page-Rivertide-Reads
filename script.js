function gsapScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
gsapScrollTrigger()


var tl = gsap.timeline()

function loaderFunc() {
    var num = 0;
    setInterval(() => {
        num += Math.floor(Math.random() * 20);
        if (num >= 100) {
            num = 100;
        }
        document.body.querySelector('.percent').innerHTML = `${num}%`
    }, 150);
}

tl.to('.loader h1', {
    delay: 1,
    duration: 1,
    onStart: loaderFunc()
})

tl.to('.loader', {
    top: '-100vh',
    duration: 0.7,
    delay: 0.2,
})

tl.from('.title h1', {
    y: 200,
    duration: 0.6,
    stagger: 0.3,
})

tl.from('.search input, .search button', {
    x: -200,
    autoAlpha: 0,
    duration: 0.5,
})


gsap.to('.description .description-text', {
    transform: 'translateX(-100%)',
    duration: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: '.description',
        scroller: '.main',
        scrub: 3,
        pin: true,
        start: 'top 0',
        end: 'top -170%'
    },
})

gsap.to('.features-heading', {
    duration: 2,
    ease: 'none',
    text: {
        value: "We Offer",
        delimiter: ""
    },
    scrollTrigger: {
        trigger: '.features-heading',
        scroller: '.main',
        start: 'top 60%'
    }
});

gsap.from('.features-heading', {
    ease: 'steps(1)',
    borderColor: "transparent",
    duration: 0.5,
    repeat: -1,
    yoyo: true,

})

gsap.from('.features-section', {
    duration: 1,
    stagger: 0.3,
    y: 200,
    autoAlpha: 0,
    scrollTrigger: {
        trigger: '.features-section',
        scroller: '.main',
        start: 'top 70%'
    }
})


document.querySelectorAll('.features')
    .forEach(function (section) {
        const box = section.querySelector('.box');
        const boxRadius = box.offsetWidth / 2;

        section.addEventListener('mousemove', function (dets) {
            gsap.to(box, {
                autoAlpha: 1,
                duration: 1.2,
                top: dets.clientY - section.getBoundingClientRect().top - boxRadius,
                left: dets.clientX - section.getBoundingClientRect().left - boxRadius,
                ease: "expo.out"
            });
        });

        section.addEventListener('mouseleave', function () {
            gsap.to(box, {
                autoAlpha: 0,
                duration: 1
            });
        });
    });

gsap.from('.credits', {
    scale: 0,
    autoAlpha: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.credits',
        scroller: '.main',
        start: 'to 99%',
        end: 'bottom 100%',
        scrub: 2
    }
})

