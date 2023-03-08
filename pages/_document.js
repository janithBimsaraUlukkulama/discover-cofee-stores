import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="preload"
                    href="/public/static/fonts/IBMPlexSans-Bold.ttf"
                    as="font"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/public/static/fonts/IBMPlexSans-Regular.ttf"
                    as="font"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/public/static/fonts/IBMPlexSans-SemiBold.ttf"
                    as="font"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
