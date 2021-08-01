import tw from 'twin.macro';
import * as React from 'react';
import Image from 'next/image';
import { usePalette } from 'react-palette';
import usePokedex from '@/lib/usePokedex';
import PageContainer from '@/components/layout/PageContainer';
import TitleBar from '@/components/pokemon/details/TitleBar';
import MainContainer from '@/components/layout/MainContainer';
import styles from '@/styles/Details.module.css';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Header = tw.div`w-full flex flex-col justify-between items-center relative `;

const NavigationBtn = tw.button`rounded-lg  text-white text-lg font-semibold p-5`;

export default function DetailsHeader({ pokemon }) {
  const { getPokemonSprite } = usePokedex();

  const sprite = getPokemonSprite(pokemon.id)

  const { data: imgData, loading, error } = usePalette(sprite); // Get pokemon's sprite predominant colors
  
  return (
    <Header>
      <TitleBar pokemon={pokemon} />
      <div className={styles.rounded} style={{ backgroundColor: imgData?.vibrant }} tw='h-full w-full absolute' />
      <div tw='absolute bottom-0 bg-gradient-to-t from-gray-100 w-full h-3/6' />
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        tw='absolute mt-24 z-20'>
        {sprite && <Image src={sprite} alt={pokemon.name} width='300px' height='300px' />}
      </motion.div>
    </Header>
  );
}