import React from 'react'
import { borrarMedia, editarMedia,  obtenerMedia } from '../../services/mediaService'
import { useEffect, useState } from 'react';
import Modal from './Modal'
import Table from './Table';
import { crearMedia } from '../../services/mediaService';

export default function Media() {
   const [medias, setMedias] = useState([])
   const [media, setMedia] = useState({
      titulo : '',
      director : '',
      genero : '',
      productora : '',
      imagen : '',
      serial : '',
      sipnosis : '',
      tipo : '',
      url : '',
})

const [mediaE, setMediaE] = useState({
  titulo : '',
  director : '',
  genero : '',
  productora : '',
  imagen : '',
  serial : '',
  sipnosis : '',
  tipo : '',
  url : '',
})

  useEffect(() => {
    listarMedia();
  }, [])
  

  const listarMedia = async () => {
    try {
      const { data } = await obtenerMedia()  
      console.log(data)  
      setMedias(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const guardar = async () => {
    try {
        const response = await crearMedia(media)
        console.log(response)
        listarMedia()
    } catch (e) {
        console.log(e)
    }
  }

  const extId =  (e) => {
    const tipoId = e.target.id
    console.log(tipoId)
    return tipoId
  }

  const editar = async(id) => {
    try {
        const response = await editarMedia(id, mediaE)
        console.log(response)
        listarMedia()
    } catch (e) {
        console.log(e)
    }
  }

  const handleChange = e => {
    // console.log(e.target.name)
    setMedia({
      ...media,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeEdit = e => {
    // console.log(e.target.name)
    setMediaE({
      ...mediaE,
      [e.target.name]: e.target.value
    })
    console.log(mediaE)
  }

  const clearForm = () => {
    setMedia({
      titulo : '',
      director : '',
      genero : '',
      productora : '',
      imagen : '',
      serial : '',
      sipnosis : '',
      tipo : '',
      url : '',
    })
  }

  const borrarMediaPorId = async (e) => {
    const id = e.target.id
        try {
          const response = await borrarMedia(id)
          console.log(response)
          listarMedia()
      } catch (e) {
          console.log(e)
      }

  }
  

  return (
    <>
        <Table 
         medias={medias} 
         borrarMediaPorId={borrarMediaPorId}
         clear= {clearForm}
         media = {mediaE}
         change1={handleChangeEdit}
         editar={editar}
         extId = {extId}
        //  id={tipoId}
         />
        <Modal
        editar = {editar}
        media = {media}
        change = {handleChange}
        guardar = {guardar}
        clearForm = {clearForm}
        />
    </>
  );
}
