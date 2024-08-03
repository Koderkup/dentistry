import { getData } from "@/utils/fetchData";
import { fetchUrlParams } from "@/utils/fetchUrlParams";
import path from "path";

export async function getStaticProps() {
  const fs = require("fs/promises");
  const pagesDirectory = path.join(process.cwd(), "pages");
  const data = await fetchUrlParams();
  const { articles, doctors, services, subServices, subServiceDirections } =
    data;
  const articleIds = articles.map((article) => article.id);
  const doctorIds = doctors.map((doctor) => doctor.id);
  const serviceIds = services.map((service) => service.id);
  const subServiceIds = subServices.map((subService) => subService.id);
  const subServiceDirectionIds = subServiceDirections.map(
    (subServiceDirection) => subServiceDirection.id
  );
  const staticPages = await fs.readdir(pagesDirectory);
  const staticPaths = staticPages
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
        "robots.jsx",
        "sitemap-generate.xml.jsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `Allow: /${staticPagePath.split(".")[0]}`;
    });
  staticPaths.unshift("Allow: /");
  const articlesPath = articleIds.map((id) => `Allow: /articles/${id}`);
  const doctorsPath = doctorIds.map((id) => `Allow: /doctors/${id}`);
  const servicesPath = serviceIds.map((id) => `Allow: /services/${id}`);
  const subServicePath = subServiceIds.map((id) => `Allow: /subservices/${id}`);
  const subServiceDirectionPath = subServiceDirectionIds.map(
    (id) => `Allow: /subservice-direction/subdirection/${id}`
  );
  const allPaths = [
    ...staticPaths,
    ...articlesPath,
    ...doctorsPath,
    ...servicesPath,
    ...subServicePath,
    ...subServiceDirectionPath,
  ];
  const allPagesString = allPaths.join("\n");

  const robotsText = `
User-agent: *
Allow: /

# test-bot
User-agent: test-bot
${allPagesString}

# black-listed-bot
User-agent: black-listed-bot
Disallow: /api
Disallow: /users
Disallow: /edit_user
Disallow: /profile
Disallow: /create-widget
Disallow: /services/create
Disallow: /subservices/create
Disallow: /subservices
Disallow: /subservice-direction/create
Disallow: /subservice-direction
Disallow: /doctors/create
Disallow: /doctors
Disallow: /articles/create

# Host
Host: ${process.env.BASE_URL}

# Sitemaps
Sitemap: ${process.env.BASE_URL}sitemap.xml
  `;

  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  fs.writeFile(robotsPath, robotsText);

  return {
    props: {},
  };
}

const Robots = () => {
  return null;
};

export default Robots;
