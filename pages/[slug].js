import Head from "next/head";
import { NotionRenderer } from "react-notion";
import Twemoji from "react-twemoji";
import styles from "../styles/Home.module.css";

import { getAllPosts } from ".";

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.filter((page) => page.page).map((row) => `/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const pages = await getAllPosts();
  // Find the current blogpost by slug
  const page = pages.find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${page.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      page,
    },
  };
}

export default function Page({ page, blocks }) {
  if (!page) return null;
  return (
    <Twemoji options={{ className: styles.twemoji }}>
      <Head>
        <title>{`Mohammad H. Sattarian | ${page.title}`}</title>
      </Head>
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 8px" }}>
        <NotionRenderer blockMap={blocks} />
      </div>
    </Twemoji>
  );
}
