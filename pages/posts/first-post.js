import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            {/* The Script component offers precise control over script loading compared to traditional script tags. With its strategy field, the load time can be managed, and the onLoad field allows for immediate execution of JavaScript code after the script has completed loading. */}
            <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                        console.log(
                            `script loaded correctly, window.FB has been populated`,
                        )
                    }
                />
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Layout>
    );
}
