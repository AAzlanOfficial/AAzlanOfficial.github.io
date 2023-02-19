import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello! My name is <b>Ali</b>. An emerging React developer.</p>
        <p>
          (This is my website - I am building it through{' '}
          <a href="https://nextjs.org/learn">Next.js tutorial</a>.)
        </p>
        <Link className="underline font-bold" href="./posts/first-post">My First Post</Link>
      </section>
    </Layout>
  );
}