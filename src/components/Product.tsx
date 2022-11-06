import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/backetSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

export const Product = ({ id, title, price, description, category, image }: IProduct) => {
    const [rating, setRating] = useState<number>(0)
    const [hasPrime, setHasPrime] = useState<boolean>(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setRating(
            Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) +
            MIN_RATING
        );
        setHasPrime(Math.random() < 0.5);
    }, []);

    const addItemToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime };

        // Отправляем продукт в REDUX store
        dispatch(addToBasket(product));
    }

    return (
        <div className={'relative flex flex-col m-5 bg-white z-30 p-10'}>
            <p className={'absolute top-2 right-2 text-xs italic text-gray-400'}>{category}</p>

            <Image className={'self-center'} src={image} height={200} width={200} alt={title}/>

            <h4>{title}</h4>
            <div className={'flex'}>
                {new Array(rating)
                    .fill(<></>)
                    .map((_, i) => (
                        <StarIcon className={'h-5 text-yellow-500'}/>
                    ))}
            </div>

            <p className={'text-xs my-2 line-clamp-2'}>{description}</p>

            <div className={'mb-5'}>
                <Currency quantity={price} currency={'GBP'}/>
            </div>

            {hasPrime && (
                <div className={'flex items-center space-x-2 -mt-5'}>
                    <img className={'w-12'} src="https://links.papareact.com/fdw" alt=""/>
                    <p className={'text-xs text-gray-500'}>FREE Next-day Delivery</p>
                </div>
            )}

            <button
                className={'mt-auto button'}
                onClick={addItemToBasket}
            >Add to basket</button>
        </div>
    );
}
