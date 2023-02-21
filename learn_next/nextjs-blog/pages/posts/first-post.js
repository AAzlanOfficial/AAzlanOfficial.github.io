import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';


export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1 id="hello" className='hello'>This is my first post on react. A long way to go.</h1>
    </Layout>
  );
}