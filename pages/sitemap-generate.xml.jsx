"use client";
import { getData } from "@/utils/fetchData";
import path from "path";
export const { articles } = await getData("articles");
export const { doctors } = await getData("doctors");
export const { services } = await getData("services");
export const { subServices } = await getData("subservices");
export const { subServiceDirections } = await getData(
  "subservice-direction/subdirection"
);
export const articleIds = articles.map((article) => article.id);
export const doctorIds = doctors.map((doctor) => doctor.id);
export const serviceIds = services.map((service) => service.id);
export const subServiceIds = subServices.map((subService) => subService.id);
export const subServiceDirectionIds = subServiceDirections.map(
  (subServiceDirection) => subServiceDirection.id
);
export async function getStaticProps() {
  const fs = require("fs");
  const pagesDirectory = path.join(process.cwd(), "pages");
  const staticPaths = fs
    .readdirSync(pagesDirectory)
    .filter((staticPage) => {
      return ![
        "api",
        "_app.js",
        "_document.js",
        "404.js",
        "sitemap.xml.js",
        "index.js",
        "users",
        "edit_user",
        "profile",
        "create-widget",
        "services/create",
        "subservices/create",
        "subservices",
        "subservice-direction/create",
        "subservice-direction",
        "doctors/create",
        "doctors",
        "articles/create",
        "sitemap-generate.xml.jsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.BASE_URL}/${staticPagePath.split(".")[0]}`;
    });
  staticPaths.unshift(process.env.BASE_URL);
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPaths
      .map(
        (url) =>
          `<url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
      ${articleIds
        .map(
          (id) => `<url>
        <loc>${process.env.BASE_URL}/articles/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
        )
        .join("")}
        ${doctorIds
          .map(
            (id) => `<url>
        <loc>${process.env.BASE_URL}/doctors/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
          )
          .join("")}
          ${serviceIds
            .map(
              (id) => `<url>
        <loc>${process.env.BASE_URL}/services/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
            )
            .join("")}
            ${subServiceIds
              .map(
                (id) => `<url>
        <loc>${process.env.BASE_URL}/subservices/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
              )
              .join("")}
              ${subServiceDirectionIds
                .map(
                  (id) => `<url>
        <loc>${
          process.env.BASE_URL
        }/subservice-direction/subdirection/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
                )
                .join("")}
  </urlset>`;
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap);

  return {
    props: {},
  };
}
const Sitemap = () => {
  return null;
};

export default Sitemap;
