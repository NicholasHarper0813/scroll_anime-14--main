"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

// what ever written in this side will executed as a server action

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );
  //   console.log(response);

  const data = await response.json();
  //   console.log(data);

  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
}; // function is used to call API and return data
