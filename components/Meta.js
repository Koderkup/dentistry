import Head from "next/head";

export default function Meta({title, description, keywords}) {
  return (
    <Head>
      <title>
        {title}
      </title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta name="author" content="Мирастом" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
