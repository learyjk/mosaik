import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import gsapTrial from "gsap-trial";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: "vertical", // vertical, horizontal
  gestureDirection: "vertical", // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});
gsap.registerPlugin(ScrollTrigger);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const heroAnimation = () => {
  const heroText = document.querySelector<HTMLDivElement>(
    '[wb-data="hero-text"]'
  );
  const heroSubtitle = document.querySelector<HTMLDivElement>(
    '[wb-data="hero-subtitle"]'
  );
  const videoLink = document.querySelector<HTMLDivElement>(
    '[wb-data="video-link"]'
  );
  if (!heroText || !heroSubtitle || !videoLink) {
    return;
  }

  const splitHeroText = new SplitType(heroText);
  const splitHeroSubtitle = new SplitType(heroSubtitle);

  //   .from(splitHeroText.lines, {
  //     y: "100%",
  //     skewX: "-8",
  //     autoAlpha: 0,
  //     stagger: 0.3,
  //     ease: "expo.out",
  //   })

  const tl = gsap.timeline();
  tl.from(splitHeroSubtitle.words, {
    opacity: 0,
    x: "1em",
    duration: 1,
    ease: "power2.out",
    stagger: { amount: 0.2 },
  }).from(videoLink, { opacity: 0, scale: 0 }, ">");
};

const mosaikIsDesignedAnimation = () => {
  const mosaikIsDesignedText = document.querySelector<HTMLDivElement>(
    '[wb-data="mosaik-is-designed"]'
  );
  if (!mosaikIsDesignedText) {
    return;
  }

  const splitMosaikDesignedText = new SplitType(mosaikIsDesignedText);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[wb-data="mosaik-designed-wrapper"]',
      start: "top 50%",
      end: "bottom 90%",
      scrub: true,
    },
  });
  tl.from(splitMosaikDesignedText.words, {
    opacity: 0.2,
    duration: 0.8,
    ease: "power1.out",
    stagger: { each: 0.8 },
  });
};

const sayHelloToAnimation = () => {
  const sayHelloText = document.querySelector('[wb-data="say-hello"]');
  if (!sayHelloText) return;
  const sayHelloTextBullets = document.querySelectorAll(
    '[wb-data="hello-text"]'
  );
  if (sayHelloTextBullets.length === 0) return;

  sayHelloTextBullets.forEach((sayHelloBullet) => {
    gsap.set(sayHelloBullet, { opacity: 0, yPercent: 100 });
  });

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: '[wb-data="say-hello-wrapper"]',
      start: "top 60%",
      end: "top 0%",
      scrub: true,
    },
  });

  tl1.from(sayHelloText, {
    opacity: 0,
    scale: 8,
    ease: "none",
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '[wb-data="say-hello-wrapper"]',
      start: "top 0%",
      end: "bottom 100%",
      scrub: true,
    },
  });
  tl2
    .to(sayHelloTextBullets[0], {
      opacity: 1,
      yPercent: 0,
      ease: "none",
      delay: 1,
    })
    .to(
      sayHelloTextBullets[0],
      { opacity: 0, yPercent: -100, ease: "none" },
      ">+=3"
    )
    .to(sayHelloTextBullets[1], { opacity: 1, yPercent: 0, ease: "none" })
    .to(
      sayHelloTextBullets[1],
      { opacity: 0, yPercent: -100, ease: "none" },
      ">+=3"
    )
    .to(sayHelloTextBullets[2], { opacity: 1, yPercent: 0, ease: "none" })
    .to(
      sayHelloTextBullets[2],
      { opacity: 0, yPercent: -100, ease: "none" },
      ">+=3"
    );
};

const moldBarAnimation = () => {
  const moldBarText = document.querySelector<HTMLDivElement>(
    '[wb-data="mold-bar"]'
  );
  if (!moldBarText) return;
  const splitHeroText = new SplitType(moldBarText);

  gsap.from(splitHeroText.chars, {
    scrollTrigger: {
      trigger: moldBarText,
      start: "bottom 90%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
  });
};

const searchAnimation = () => {
  const searchBullets = document.querySelector(
    '[wb-data="search-bullets"]'
  )?.childNodes;
  const searchImages = document.querySelector(
    '[wb-data="search-images"]'
  )?.childNodes;

  if (!searchBullets || !searchImages) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[wb-data="search-wrapper"]',
      start: "top 50%",
      end: "bottom 100%",
      scrub: true,
    },
  });

  gsap.set(searchBullets, { opacity: 0, xPercent: -100 });
  gsap.set(searchImages, { opacity: 0 });
  tl.to(searchBullets, { opacity: 1, xPercent: 0, stagger: 1 })
    .to(searchImages, { opacity: 1, stagger: 1 }, "<")
    .to(searchImages, { opacity: 0, stagger: 1 }, "<+=1");
};

const keepClientsAnimation = () => {
  const keepClientsText = document.querySelector<HTMLDivElement>(
    '[wb-data="keep-clients"]'
  );
  if (!keepClientsText) {
    return;
  }

  const splitkeepClientsText = new SplitType(keepClientsText);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[wb-data="keep-clients-wrapper"]',
      start: "top 50%",
      end: "bottom 90%",
      scrub: true,
    },
  });
  tl.from(splitkeepClientsText.words, {
    opacity: 0.2,
    duration: 0.8,
    ease: "power1.out",
    stagger: { each: 0.8 },
  });
};

const sealDealAnimation = () => {
  const sealDealText = document.querySelector<HTMLDivElement>(
    '[wb-data="seal-deal"]'
  );
  if (!sealDealText) return;
  const splitSealDealText = new SplitType(sealDealText);

  gsap.from(splitSealDealText.chars, {
    scrollTrigger: {
      trigger: sealDealText,
      start: "bottom 90%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
  });
};

const transactionRoomAnimation = () => {
  const transactionBullets = document.querySelector(
    '[wb-data="transaction-bullets"]'
  )?.childNodes;

  const transactionWrapper = document.querySelector(
    '[wb-data="transaction-wrapper"]'
  );
  const transactionVideo = transactionWrapper?.querySelector("video");

  if (!transactionBullets || !transactionVideo) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: transactionWrapper,
      start: "top 50%",
      end: "bottom 100%",
      scrub: true,
    },
  });

  gsap.set(transactionBullets, { opacity: 0, xPercent: -100 });
  gsap.set(transactionVideo, { opacity: 0, scale: 0.8 });
  tl.to(transactionBullets, { opacity: 1, xPercent: 0, stagger: 1 }).to(
    transactionVideo,
    { opacity: 1, scale: 1 },
    "<"
  );
};

const homeBaseAnimation = () => {
  const homeBaseText = document.querySelector<HTMLDivElement>(
    '[wb-data="home-base"]'
  );
  if (!homeBaseText) return;
  const splitHomeBaseText = new SplitType(homeBaseText);

  gsap.from(splitHomeBaseText.chars, {
    scrollTrigger: {
      trigger: homeBaseText,
      start: "bottom 90%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
  });
};

const makeMoveAnimation = () => {
  const makeMoveText = document.querySelector<HTMLDivElement>(
    '[wb-data="make-move"]'
  );
  if (!makeMoveText) return;
  const splitMakeMoveText = new SplitType(makeMoveText);

  gsap.from(splitMakeMoveText.chars, {
    scrollTrigger: {
      trigger: makeMoveText,
      start: "bottom 90%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
  });
};

const powerfulAnimation = () => {
  const headlineText = document.querySelector<HTMLDivElement>(
    '[wb-data="powerful"]'
  );
  if (!headlineText) return;
  const splitHeadlineText = new SplitType(headlineText);

  gsap.from(splitHeadlineText.chars, {
    scrollTrigger: {
      trigger: headlineText,
      start: "bottom 90%",
      end: "bottom 50%",
      scrub: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.05,
  });
};

const init = () => {
  gsap.set("[wb-data]", { autoAlpha: 1 });
  heroAnimation();
  mosaikIsDesignedAnimation();
  sayHelloToAnimation();
  moldBarAnimation();
  searchAnimation();
  //keepClientsAnimation();
  sealDealAnimation();
  transactionRoomAnimation();
  homeBaseAnimation();
  makeMoveAnimation();
  powerfulAnimation();
};

document.addEventListener("DOMContentLoaded", init);
