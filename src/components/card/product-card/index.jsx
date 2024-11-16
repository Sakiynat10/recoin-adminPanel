
import React from "react";
import { CardBody, CardContainer } from "../../ui/3d-card";
import { CardItem } from './../../ui/3d-card';
import { ShimmerButton } from "../buttons";

export function ProductCard({product}) {
  return (
    (<CardContainer>
      <CardBody
        className="relative group/card  hover:shadow-2xl bg-gray-800 hover:shadow-emerald-500/[0.1]  border-white/[0.2]  w-auto  h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="50" className="w-[250px]">
          <img
            src={product?.Image}
            height="500"
            width="600"
            className="h-[200px] w-[600px] object-cover rounded-xl group-hover/card:shadow-sm"
            alt="thumbnail" />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl mt-2 font-bold text-white">
          {product?.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="w-[250px] text-ellipsis-1 truncate text-sm max-w-sm mt-2 text-neutral-300">
          {product?.description}
        </CardItem>
        <div className="flex gap-2">
            <CardItem
            as="p"
            translateZ="60"
            className="text-sm max-w-sm mt-2 text-neutral-300">
            AvailableQuantity:
            </CardItem>
            <CardItem
            as="p"
            translateZ="60"
            className="text-sm max-w-sm mt-2 text-neutral-300">
            {product?.availableQuantity}
            </CardItem>
        </div>
        <div className="flex gap-2">
            <CardItem
            as="p"
            translateZ="60"
            className="text-sm max-w-sm mt-2 text-neutral-300">
            Price product:
            </CardItem>
            <CardItem
            as="p"
            translateZ="60"
            className="text-sm max-w-sm mt-2 text-yellow-300 ">
            ${product?.price}
            </CardItem>
        </div>
        <div className="flex justify-between items-center mt-10">
            <CardItem
                translateZ={20}
                as="button"
                className="w-[40%] flex justify-center items-center bg-[#0502b7] px-4 py-3 rounded-xl  dark:bg-white dark:text-black text-white text-xs font-bold">
                <img src="/edit.svg" alt="edit" />
            </CardItem>
            <CardItem
                translateZ={20}
                as="button"
                className="flex justify-center bg-[#cd0132] items-center w-[40%] px-4 py-3 rounded-xl dark:bg-white dark:text-black text-white text-xs font-bold">
                <img src="/delete.svg"/>
            </CardItem>
        </div>
      </CardBody>
    </CardContainer>)
  );
}
