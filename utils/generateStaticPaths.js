const fs = require("fs");
const path = require("path");
export async function generateStaticPaths() {
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
        "robots.jsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.BASE_URL}${staticPagePath.split(".")[0]}`;
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
  </urlset>`;
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap);
}

export function readSitemap() {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    return fs.readFileSync(sitemapPath, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      // Если файл не существует, возвращаем пустую строку
      return "";
    } else {
      throw err;
    }
  }
}

export function writeSitemap(newUrls) {
  try {
    // Читаем существующее содержимое файла
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    const existingData = readSitemap();
    const newData = newUrls.join("");
    
    // Проверяем, содержит ли файл новые данные
    if (existingData && !existingData.includes(newData)) {
      // Если новые данные не найдены, записываем их в файл
      // Проверяем, является ли содержимое файла валидным XML
      if (existingData.trim().startsWith("<?xml")) {
        // Проверяем, есть ли закрывающий тег </urlset>
        const lastIndex = existingData.lastIndexOf("</urlset>");
        if (lastIndex !== -1) {
          // Если есть, вставляем новые URL-адреса перед ним
          fs.writeFileSync(
            sitemapPath,
            existingData.slice(0, lastIndex) +
              "\n" +
              newUrls.join("\n") +
              "\n" +
              existingData.slice(lastIndex)
          );
        } else {
          // Если нет, добавляем новые URL-адреса в конец файла
          fs.appendFileSync(sitemapPath, "\n" + newUrls.join("\n"));
        }
      } else {
        // Если содержимое не является валидным XML, то записываем новый файл
        fs.writeFileSync(
          sitemapPath,
          `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${newUrls.join("\n")}
</urlset>`
        );
      }
    }
  } catch (err) {
    console.error("Ошибка при записи в sitemap.xml:", err);
  }
}

export function uniqueDataHandler(data){
  return Array.from(new Set(data.split("\n"))).join("\n");
}