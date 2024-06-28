import {
  generateStaticPaths,
  readSitemap,
  writeSitemap,
} from "./generateStaticPaths";
const fs = require("fs");
const path = require("path");
export async function generateSitemap(str, dynamicPagePaths = []) {
  // Формируем новые URL-адреса
  const newUrls = [
    ...dynamicPagePaths.map(
      (id) => `<url>
        <loc>${process.env.BASE_URL}${str}/${id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`
    ),
  ];
  // Проверяем, существует ли файл sitemap.xml
  if (readSitemap()) {
    // Если файл существует, добавляем в него содержимое
    writeSitemap(newUrls);
  } else {
    generateStaticPaths();
    writeSitemap(newUrls);
  }
}
