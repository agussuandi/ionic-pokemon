import React, { useState, useEffect, useRef } from 'react'
import { IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonRow, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonCard, 
    IonCardTitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    IonCardContent,
    IonFab,
    IonFabButton,
    IonIcon
} from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import {
    AdMob,
    BannerAdOptions,
    BannerAdPosition,
    BannerAdSize
} from '@capacitor-community/admob';
import { searchQueryString } from '../../utils/app';

import './Home.css';
import ModalPokemon from './ModalPokemon';


export default function Home()
{
    const [modal, setModal]                         = useState(false)
    const contentRef                                = useRef(null)
    const URI_API                                   = 'https://pokeapi.co/api/v2'
    const [pokemons, setPokemons]                   = useState([])
    const [pokemonDetail, setPokemonDetail]         = useState({})
    const [loadPokemon, setLoadPokemon]             = useState(`${URI_API}/pokemon?limit=20`)
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false)
    
    const showBanner = async () => {
        try {
            const options = {
                adId: 'ca-app-pub-4735885292647366/1692935948',
                adSize: BannerAdSize.BANNER,
                position: BannerAdPosition.BOTTOM_CENTER,
                isTesting: false
            };
            await AdMob.showBanner(options)
        } catch (error) {
            alert(error)
        }
    }

    const getPokemons = async (event = undefined) => {
        const resPokemons = await fetch(loadPokemon)
        const dataPokemon = await resPokemons.json()

        const limit  = await searchQueryString('limit', dataPokemon.next)
        const offset = await searchQueryString('offset', dataPokemon.next)
        
        setLoadPokemon(`${URI_API}/pokemon?limit=${limit}&offset=${offset || 20}`)
        createPokemonObject(dataPokemon.results)

        if (event !== undefined) {
            setTimeout(() => {
                event.target.complete()
                if (dataPokemon.results.length < 1) setInfiniteDisabled(true)
                else setInfiniteDisabled(false)
            }, 500);
        }
    }

    const createPokemonObject = results => {
        results.forEach( async pokemon => {
            const resPokemons = await fetch(`${URI_API}/pokemon/${pokemon.name}`)
            const dataPokemon = await resPokemons.json()
            setPokemons(currentPokemons => [...currentPokemons, dataPokemon])
            pokemons.sort((a, b) => a.id - b.id)
        })
    }

    const handleSearch = key => {
        const items = document.querySelectorAll('.pokemon');
        const query = key.toLowerCase();
        items.forEach(item => {
            const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    }

    const scrollToTop = () => {
        contentRef.current && contentRef.current.scrollToTop();
    }

    const toggleModal = () => setModal(!modal)

    const getPokemonDetail = async pokemonName => {
        const resPokemons = await fetch(`${URI_API}/pokemon/${pokemonName}`)
        const dataPokemon = await resPokemons.json()
        setPokemonDetail(dataPokemon)
        toggleModal()
    }

    useEffect(() => {
        showBanner()
        getPokemons()
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar placeholder="Search" onIonChange={(e) => handleSearch(e.detail.value)}></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen ref={contentRef} scrollEvents={true}>
                <IonGrid>
                    <IonRow>
                        {pokemons.map((pokemon, i) => (
                            <IonCol key={i} sizeXs="6" sizeSm="4" sizeMd="3" className="pokemon" onClick={() => getPokemonDetail(pokemon.name)}>
                                <IonCard className={`${pokemon.types[0].type.name} thumb-container`}>
                                    <img src={pokemon.sprites.other.dream_world.front_default} width="100" height="100" style={{display: 'block', margin: 'auto'}} />
                                    <IonCardContent>
                                        <IonCardTitle style={{textAlign: 'center'}}>{pokemon.name}</IonCardTitle>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonInfiniteScroll
                    onIonInfinite={getPokemons}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."
                    />
                </IonInfiniteScroll>
                <IonFab vertical="bottom" horizontal="end" slot="fixed" onClick={() => scrollToTop()}>
                    <IonFabButton>
                        <IonIcon icon={arrowUp} />
                    </IonFabButton>
                </IonFab>
                <ModalPokemon modal={modal} toggleModal={toggleModal} pokemonDetail={pokemonDetail} />
            </IonContent>
        </IonPage>
    )
}