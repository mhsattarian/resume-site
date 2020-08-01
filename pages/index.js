import Head from "next/head";
import { NotionRenderer } from "react-notion";
import styles from "../styles/Home.module.css";
import Twemoji from "react-twemoji";

const NOTION_BLOG_ID = "Mohammad-H-Sattarian-eb87a8ab1acc49f69e8ac1bb597ad0b2";

export async function getStaticProps() {
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${NOTION_BLOG_ID}`
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}

export default function Home({ blockMap }) {
  return (
    <Twemoji options={{ className: styles.twemoji }}>
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 8px" }}>
        <Head>
          <title>Mohammad Hassan Sattarian</title>
        </Head>
        <NotionRenderer blockMap={blockMap} />
      </div>
    </Twemoji>
  );
}
