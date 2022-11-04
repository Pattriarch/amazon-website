import Head from 'next/head'
import { Banner } from '../components/Banner';
import { Header } from "../components/Header";
import { ProductFeed } from "../components/ProductFeed";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

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
    const products: IProduct[] = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
    return {
        props: {
            products
        }
    }
}
