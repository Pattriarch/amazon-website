import Head from 'next/head'
import { Banner } from '../components/Banner';
import { Header } from "../components/Header";
import { ProductFeed } from "../components/ProductFeed";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { getSession } from "next-auth/react";

export default function Home({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={'bg-gray-100'}>
            <Head>
                <title>Amazon</title>
            </Head>

            <Header/>

            <main className={'max-w-screen-2xl mx-auto'}>
                <Banner />
                <ProductFeed products={products}/>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Избавляемся от того, что по дефолту юзер не залогинен
    const session = await getSession(context);

    const products: IProduct[] = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
    return {
        props: {
            products,
            session
        }
    }
}
