import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("localhost:8090");

  await expect(page).toHaveTitle(/Muthukumar/);
});

test("Validate the link page is online", async ({ page }) => {
  await page.goto("localhost:8090");

  const links = [
    {
      name: "Website",
      expectedURL: "https://www.muthukumar.dev/",
      expectedText: "muthukumar",
    },
    {
      name: "Drawings",
      expectedURL: "https://www.instagram.com/muthudoesart",
    },
    {
      name: "Github",
      expectedURL: "https://github.com/muthhukumar",
      expectedText: "I'm Muthukumar",
    },
    {
      name: "Source Code",
      expectedURL: "https://github.com/muthhukumar/linktree",
      expectedText: "Muthukumar's Linktree",
    },
    {
      name: "Blog",
      expectedURL: "https://blog.muthukumar.dev/",
      expectedText: "Hello",
    },
    {
      name: "Gallery",
      expectedURL: "https://gallery.muthukumar.dev/",
      expectedText: "TODO",
    },
    {
      name: "Twitter",
      expectedURL: "https://x.com/am_muthukumar",
    },
    {
      name: "LinkedIn",
      expectedURL: "https://www.linkedin.com/in/muthu-kumar-2bb034181/",
    },
    {
      name: "Leetcode",
      expectedURL: "https://leetcode.com/u/awesomemuthu28/",
      expectedText: "Muthu kumar",
    },
    {
      name: "Exercism",
      expectedURL: "https://exercism.org/profiles/muthhukumar",
    },
    {
      name: "MyAnimeList",
      expectedURL: "https://myanimelist.net/animelist/Muthukumark",
    },
    {
      name: "MyMangaList",
      expectedURL: "https://myanimelist.net/mangalist/Muthukumark",
    },
  ];

  for (const link of links) {
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link", { name: link.name }).click(),
    ]);

    await popupPage.waitForLoadState("domcontentloaded", {
      timeout: 5000,
    });

    expect(popupPage.url()).toContain(link.expectedURL);

    if (link.expectedText)
      expect(popupPage.getByText(link.expectedText)).toBeVisible();
  }
});
