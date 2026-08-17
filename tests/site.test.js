import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const shopUrl = "https://grownby.com/farms/bold-love-farm-bakery/shop";
const outputDirectory = new URL("../dist/", import.meta.url);
const homepage = await readFile(new URL("index.html", outputDirectory), "utf8");
const aboutPage = await readFile(new URL("about/index.html", outputDirectory), "utf8");
const contactPage = await readFile(new URL("contact/index.html", outputDirectory), "utf8");
const productsPage = await readFile(new URL("products/index.html", outputDirectory), "utf8");

function visibleText(document) {
  return document
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, " ")
  .trim();
}

const homepageText = visibleText(homepage);
const aboutText = visibleText(aboutPage);
const contactText = visibleText(contactPage);
const productsText = visibleText(productsPage);

test("the generated homepage has the required document metadata", () => {
  assert.match(homepage, /<!DOCTYPE html>/i);
  assert.match(homepage, /<html lang="en">/);
  assert.match(homepage, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(homepage, /<title>Bold Love Farm &amp; Bakery<\/title>/);
  assert.equal((homepage.match(/<h1\b/g) || []).length, 1);
});

test("the generated homepage includes the existing Mailchimp popup loader", () => {
  assert.equal((homepage.match(/<script\b/g) || []).length, 1);
  assert.match(homepage, /<script id="mcjs">/);
  assert.match(
    homepage,
    /https:\/\/chimpstatic\.com\/mcjs-connected\/js\/users\/c1e0805d9318df47dc11e74a1\/121b62670c533dbcbe2fbe33f\.js/,
  );
});

test("the generated homepage presents the refreshed critical content", () => {
  const requiredContent = [
    "Organic fruits and vegetables, prepared foods, sourdough breads, baked goods, and many other products from our local partners",
    "Looking for local food that's fresher, healthier, and better tasting? We can help. Our produce is certified organic and gets to you shortly after coming out of the ground.",
    "We bake and cook with the same care, so the food reaches you fresh, local, and full of nutrition.",
    "Love supporting local businesses? So do we! We carry products from 9 other local farms and producers. Shopping with us helps ensure these small, local businesses remain viable and continue providing clean food for our community.",
    "USDA Certified Organic",
    "Mount Airy, Maryland community",
  ];

  for (const content of requiredContent) {
    assert.ok(homepageText.includes(content), `Expected generated homepage to include: ${content}`);
  }

  const supersededContent = [
    "Fresh Local Food, Every Week",
    "Seasonal produce, breads, pastries, and prepared foods grown and made with care, then offered through our online store.",
    "The weekly shop brings together what we grow, what we bake, what we cook, and what we share from our local partners.",
  ];

  for (const content of supersededContent) {
    assert.ok(!homepageText.includes(content), `Expected generated homepage to omit: ${content}`);
  }

  assert.equal((homepage.match(/<p class="story-copy">/g) || []).length, 3);
});

test("both shop links use the correct destination and new-tab protections", () => {
  const shopLinks = homepage.match(new RegExp(`<a[^>]+href="${shopUrl}"[^>]*>`, "g")) || [];

  assert.equal(shopLinks.length, 2);
  for (const link of shopLinks) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener noreferrer"/);
  }
});

test("the homepage links to every information page", () => {
  const requiredLinks = [
    ["About", "/about/"],
    ["Products", "/products/"],
    ["Contact Us", "/contact/"],
  ];

  for (const [label, destination] of requiredLinks) {
    assert.match(homepage, new RegExp(`<a[^>]+href="${destination}"[^>]*>${label}</a>`));
  }

  assert.match(homepage, /<a[^>]+href="\/"[^>]+aria-current="page"[^>]*>Home<\/a>/);
});

test("all information pages have metadata, landmarks, and shared navigation", () => {
  const pageDetails = [
    {
      name: "About",
      document: aboutPage,
      title: "About | Bold Love Farm &amp; Bakery",
      currentDestination: "/about/",
    },
    {
      name: "Contact Us",
      document: contactPage,
      title: "Contact Us | Bold Love Farm &amp; Bakery",
      currentDestination: "/contact/",
    },
    {
      name: "Products",
      document: productsPage,
      title: "Products | Bold Love Farm &amp; Bakery",
      currentDestination: "/products/",
    },
  ];

  for (const page of pageDetails) {
    assert.match(page.document, /<!DOCTYPE html>/i);
    assert.match(page.document, /<html lang="en">/);
    assert.match(
      page.document,
      /<meta name="viewport" content="width=device-width, initial-scale=1">/,
    );
    assert.ok(page.document.includes(`<title>${page.title}</title>`));
    assert.match(page.document, /<meta name="description" content="[^"]+">/);
    assert.equal((page.document.match(/<h1\b/g) || []).length, 1);
    assert.match(page.document, /<main\b/);
    assert.match(page.document, /<nav class="site-nav" aria-label="Primary navigation">/);
    assert.match(page.document, /<footer\b/);
    assert.match(
      page.document,
      /<img class="site-brand-logo" src="\/bold-love-logo\.png" alt=""/,
    );
    assert.ok(!page.document.includes("site-brand-mark"));
    assert.ok(!page.document.includes(">Bold Love</span>"));
    assert.match(
      page.document,
      new RegExp(
        `<a[^>]+href="${page.currentDestination}"[^>]+aria-current="page"[^>]*>${page.name}</a>`,
      ),
    );

    for (const destination of ["/", "/about/", "/products/", "/contact/"]) {
      assert.ok(
        page.document.includes(`href="${destination}"`),
        `Expected ${page.name} page navigation to include ${destination}`,
      );
    }
  }
});

test("the About page presents the planned story sections in order", () => {
  assert.ok(aboutText.includes("About Bold Love"));

  const farmPosition = aboutText.indexOf("About the Farm");
  const bakeryPosition = aboutText.indexOf("About the Bakery");
  const partnersPosition = aboutText.indexOf("About Our Partners");

  assert.ok(farmPosition >= 0);
  assert.ok(bakeryPosition > farmPosition);
  assert.ok(partnersPosition > bakeryPosition);
  assert.ok(aboutText.includes("Our farm story is coming soon."));
  assert.ok(aboutText.includes("Our bakery story is coming soon."));
  assert.ok(aboutText.includes("Our partners’ stories are coming soon."));
});

test("the Contact Us page includes contact details and every FAQ answer", () => {
  assert.match(contactPage, /href="mailto:boldlove@boldlovefarm\.com"/);

  const requiredContent = [
    "boldlove@boldlovefarm.com",
    "What are your hours?",
    "blah, blah, blah",
    "How do I order?",
    "How do I get my food?",
    "Bold Love Farm in Mount Airy",
    "Blue Crab Fitness in Lisbon on Wednesdays and Fridays",
    "Trek Bicycle Westminster parking lot on Fridays",
    "Home delivery: Fridays",
    "Do you support the local food bank?",
    "Mount Airy Net",
    "we haven’t missed a week since May 2025",
    "What payments do you accept?",
    "Cash, check, credit card, Venmo, Zelle, CCFS food vouchers, PayPal, and SNAP",
    "Payment details are included in the checkout process",
  ];

  for (const content of requiredContent) {
    assert.ok(contactText.includes(content), `Expected Contact Us page to include: ${content}`);
  }

  assert.match(contactPage, /<a class="text-link" href="\/products\/">Products page<\/a>/);
});

test("the Products page explains the complete ordering and payment process", () => {
  assert.ok(!productsText.includes("What’s in the shop"));
  assert.ok(!productsText.includes("From cart to kitchen"));

  const requiredContent = [
    "Local and organic products, prepared foods, sourdough breads, pastries, local meats, cheeses, jam, eggs, microgreens, honey, coffee, and tea.",
    "Bold Love Farm (Mount Airy)",
    "Blue Crab Fitness (Lisbon)",
    "Trek Bicycle Westminster parking lot",
    "We’ll leave a cooler on the back deck.",
    "Choose Wednesday or Friday.",
    "Choose the available date.",
    "It’s a big cart, so you can really load it up.",
    "Online payment:",
    "Cash or check:",
    "@Kim-Anderson-66",
    "443-386-4324",
    "CCFS food vouchers:",
    "A quirk of our online store requires a billing address for offline payments.",
  ];

  for (const content of requiredContent) {
    assert.ok(productsText.includes(content), `Expected Products page to include: ${content}`);
  }

  assert.equal((productsPage.match(/<ol class="order-steps">/g) || []).length, 1);

  const shopLinks =
    productsPage.match(new RegExp(`<a[^>]+href="${shopUrl}"[^>]*>`, "g")) || [];
  assert.equal(shopLinks.length, 2);
  for (const link of shopLinks) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener noreferrer"/);
  }
});

test("all required local assets are included in the generated site", async () => {
  const assetPaths = ["favicon.ico", "bold-love-logo.png", "farm-background.png"];

  for (const assetPath of assetPaths) {
    assert.ok(homepage.includes(`/${assetPath}`) || assetPath === "farm-background.png");
    assert.ok((await stat(new URL(assetPath, outputDirectory))).isFile());
  }

  const stylesheetPath = homepage.match(/href="(\/_astro\/[^\"]+\.css)"/)?.[1];
  assert.ok(stylesheetPath, "Expected the generated homepage to reference its stylesheet");

  const stylesheet = await readFile(new URL(stylesheetPath.slice(1), outputDirectory), "utf8");
  assert.ok(stylesheet.includes("/farm-background.png"));
});
