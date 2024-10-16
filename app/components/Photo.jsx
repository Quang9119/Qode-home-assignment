'use client'

import Image from "next/image"
import { useState } from "react"
import PhotoModal from "./PhotoModal"

export default function Photo({id,src, alt, width, height, photoName, isFavorited = false}){
    const [showModal, setShowModal] = useState(false)

    function toggleModal(){
        setShowModal(!showModal)
    }

    return (
        <>
            <div
            style={{width, height}}
            className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
            >

                <form 
                className="absolute bottom-2.5 right-10 z-10"
                >
                    <input type="hidden" name="photoPath" value={src} />
                    <button 
                    type="submit"
                    className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                    </button>
                </form>

                <form 
                className="absolute bottom-2.5 right-2.5 z-10"
                >
                    <input type="hidden" name="photoName" value={photoName} />
                    <button
                    type="submit"
                    className="bg-transparent border-none text-white cursor-pointer hover:text-green-500 hover:scale-110 transition duration-300"
                    >
                    </button>
                </form>

                <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{objectFit: 'cover', objectPosition: 'center'}}
                onClick={() => setShowModal(true)}
                />
            </div>
            {
                showModal && <PhotoModal id={id} src={src} alt={alt} onClose={toggleModal} />
            }
        </>
      
    )
}