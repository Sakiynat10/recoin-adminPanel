
import React from "react";
import { CardBody, CardContainer } from "../../ui/3d-card";
import { CardItem } from './../../ui/3d-card';

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
          className="text-xl font-bold text-white">
          {product?.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" text-sm max-w-sm mt-2 text-neutral-300">
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
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
            Try now →
          </CardItem>
          <div className="flex gap-4">
            <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Edit
            </CardItem>
            <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Delete
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>)
  );
}
