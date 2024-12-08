"use client";
// only this will load in server side

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";
import AnimeCard from "./AnimeCard";

let page = 2; // to fetch new pages

export type AnimeCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]); // to get an array of AnimeProps

  useEffect(() => {
    if (inView) {
      // alert("load lawde");
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);

        page++; // increase page numbers
      });
    }
  }, [inView, data]); // when the spinner hits it run execute

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      {/* this section is for all of the subsequent pages from page one */}

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
