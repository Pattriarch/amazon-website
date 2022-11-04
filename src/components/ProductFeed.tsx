import { Product } from "./Product";

export interface ProductFeedProps {
    products: IProduct[];
}

export const ProductFeed = ({ products }: ProductFeedProps): JSX.Element => {
    return (
        <div className={'grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'}>

            {products.slice(0, 4).map((product: IProduct) => (
                <Product key={product.id} {...product} />
            ))}

            <img className={'md:col-span-full'} src={'https://links.papareact.com/dyz'} alt={''}/>

            <div className={'md:col-span-2'}>
                {products.slice(4,5).map((product: IProduct) => (
                    <Product key={product.id} {...product} />
                ))}
            </div>

            {products.slice(5, products.length).map((product: IProduct) => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    )
}

