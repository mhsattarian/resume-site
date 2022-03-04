import Head from "next/head";
import Link from "next/link";
import { NotionRenderer } from "react-notion";
import Twemoji from "react-twemoji";
import styles from "../styles/Home.module.css";

// const NOTION_BLOG_ID = "Mohammad-H-Sattarian-eb87a8ab1acc49f69e8ac1bb597ad0b2";
const NOTION_BLOG_ID = "776b73b76fb44f21a5dadfeb1861106c";

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const allpages = await getAllPosts();
  const pages = allpages.filter((page) => page.page);
  const main = allpages.find((page) => page.slug === "/");
  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${main.id}`
  ).then((res) => res.json());

  return {
    props: {
      pages,
      blocks,
    },
  };
}

export default function Home({ blocks, pages }) {
  return (
    <Twemoji options={{ className: styles.twemoji }}>
      <Head>
        <title>Mohammad H. Sattarian</title>
      </Head>
      <div className={styles.main}>
        <NotionRenderer blockMap={blocks} />
        {pages.map((page) => (
          <Link href={`/${page.slug}`} key={page.id}>
            <div className={styles.pageLink}>
              <h3>{page.title}</h3>
              <p>{page.preview}</p>
            </div>
          </Link>
        ))}
      </div>
    </Twemoji>
  );
}
