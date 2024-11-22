/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { Link, useParams} from "react-router-dom"
import axios from "../utils/axios"
import Loading from "./Loading"

const Details = () => {

    const [product, setProduct] = useState(null)
    const {id } = useParams();

    const getSingleProduct = async () =>{
        try {
            const {data} = await axios(`/products/${id}`)
            setProduct(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct()
    },[])

    return product ? (
        <>
            <div className="w-[70%] h-full m-auto flex items-center justify-between">
                <img className="object-contain w-[40%] h-[80%]" src={product.image} alt="" />

                <div className="content w-[50%]">
                    <h1 className="text-4xl">{product.title}</h1>
                    <h3 className="text-zinc-400 my-5">{product.category}</h3>
                    <h2 className="text-red-300 mb-3">$ {product.price}</h2>
                    <p className="mb-5">{product.description}</p>
                    <Link className="px-5 py-1 rounded border border-blue-400 text-blue-400 mr-3">Edit</Link>
                    <Link className="px-5 py-1 rounded border border-red-400 text-red-400">Delete</Link>
                </div>
            </div>
        </>
    ) : (<Loading />)
}

export default Details