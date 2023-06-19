import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>I am a software engineer with around 2 years working experience in Canada and another 1.5 years in China. I have a deep passion for software development, algorithms, and machine learning, and I am constantly seeking new opportunities to expand my knowledge and skills in these realms. I believe that staying up-to-date with the latest technologies and industry trends is crucial to staying competitive and achieving success in today's fast-paced tech landscape.</p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
        </Layout>
    );
}
