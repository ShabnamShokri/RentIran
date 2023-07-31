"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react'
import SearchManufacturer from './SearchManufacturer';
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';

const SearchButton = ({otherClasses}:{otherClasses : string}) =>(
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`} >
    <Image src='/magnifying-glass.svg' alt='magnifying-glass' width={40} height={40} className="object-contain" />
  </button>
)

const SearchBar = () => {
const [manufacturer,setManufacturer]=useState('');
const [model,setModel]=useState("");
const router = useRouter();


const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if(manufacturer === '' && model === ''){
    return alert('please fill in the search bar')
  }

  updateSearchParems (model.toLowerCase(),manufacturer.toLowerCase())
}

const updateSearchParems = (model : string , manufacturer : string) =>{
  const searchParems = new URLSearchParams(window.location.search);
  if(model) {
    searchParems.set('model', model)
  } else {
    searchParems.delete('model');
  }
  

  if(manufacturer) {
    searchParems.set('manufacturer', manufacturer)
  } else {
    searchParems.delete('manufacturer');
  }

  const newPathName = `${window.location.pathname}?${searchParems.toString()}`

  router.push(newPathName)
  
}

  return (
    <form className='searchbar' onSubmit={handleSearch}>
        <div className='searchbar__item'>
            <SearchManufacturer 
                manufacturer = {manufacturer}
                setManufacturer = {setManufacturer}
            />
            <SearchButton otherClasses='sm:hidden'/>
        </div>
        <div className='searchbar__item'>
          <Image src="/model-icon.png"
          width={25}
          height={25}
          alt='car model'
          className='absolute w-[20px] h-[20px] ml-4' />
          <input
          type='text' 
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan'
          className='searchbar__input'
          />
        <SearchButton otherClasses='sm:hidden'/>
        </div>
        <SearchButton otherClasses='max-sm:hidden'/>
    </form>
  )
}

export default SearchBar