import Head from "next/head";
import { NotionRenderer } from "react-notion";
import Twemoji from "react-twemoji";
import styles from "../styles/Home.module.css";

import { getAllPosts } from "./";

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const posts = await getAllPosts();
  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

export default function Home({ post, blocks }) {
  return (
    <Twemoji options={{ className: styles.twemoji }}>
      <Head>
        <title>{`Mohammad H. Sattarian | ${post.title}`}</title>
      </Head>
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 8px" }}>
        <NotionRenderer blockMap={blocks} />
      </div>
    </Twemoji>
  );
}
