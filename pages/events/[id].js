//import { useParams } from "react-router-dom";
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useState} from 'react';
import {LANGUAGES} from '../../constants/Languages';

export const Post = () => {
    const router = useRouter()
    const id = router.query.id

    return {
        id,
        fallback: false
    }
}

export async function getServerSideProps({ params }) {
    //const router = useRouter();
    //const id = context.id;
    const id = params.id;
    const res = await fetch('http://localhost:4000/opportunity/' + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'goodera123backend456auth'
        }
    });
    const data = await res.json();

    return {
        props: {
            opportunity: data
        }
    }
}

export default function Details({ opportunity }) {

    const [language, setLanguage] = useState(() => { return opportunity.lang });
    const [languageTitle, setlanguageTitle] = useState(()=>{return 'ENGILISH'});

    let map = new Map();

  //English Language:
  map.set('abt.eve.en', 'About the event');
  map.set('prereq.en', 'Prerequisites');
  map.set('country.en', 'Country');
  map.set('for.the.en', 'For the');
  map.set('eve.tl.en', 'Event Timeline');
  map.set('book.en', 'Book Now');
  map.set('abt.the.en', 'About the');
  map.set('min.vol.en', 'Min volunteers required');
  map.set('eve.type.en','Event Type');
  map.set('eve.dur.en','Duration');


  //Spanish Language:
  map.set('abt.eve.es', 'Sobre el evento');
  map.set('prereq.es', 'Requisitos previos');
  map.set('country.es', 'País');
  map.set('for.the.es', 'Para el');
  map.set('eve.tl.es', 'Línea de tiempo del evento');
  map.set('book.es', 'Reservar ahora');
  map.set('abt.the.es', 'Acerca de');
  map.set('min.vol.es', 'Mínimo de voluntarios requeridos');
  map.set('eve.type.es','Tipo de evento');
  map.set('eve.dur.es','Duración');

  //French Language
  map.set('abt.eve.fr', "A propos de l'événement");
  map.set('prereq.fr', 'Prérequis');
  map.set('country.fr', 'Pays');
  map.set('for.the.fr', 'Pour le');
  map.set('eve.tl.fr', "Chronologie de l'événement");
  map.set('book.fr', 'Réservez maintenant');
  map.set('abt.the.fr', 'About the');
  map.set('min.vol.fr', 'Bénévoles minimum requis');
  map.set('eve.type.fr',"Type d'événement");
  map.set('eve.dur.fr','Durée');

    const setActive = async (id) => {
        const res = await fetch('http://localhost:4000/opportunity/update/' + id, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:4000',
                'Access-Control-Allow-Credentials': true,
                'X-API-KEY': 'goodera123backend456auth'
            },
            body: JSON.stringify({
                active: true,
            })
        });
        const data = await res.json();
        toast.success('Event Booked Successfully!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Goodera Volunteer Selection Page</title>
                <meta name="description" content="Goodera Volunteer Selection Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <Header onChange={(val) => {
              //console.log(val);
              setLanguage(()=>{return val});
              let lang = LANGUAGES.find(option => option.value === val);
              setlanguageTitle(()=>{return lang.title});
              //console.log(languageTitle);
            }}/>

            <ToastContainer />
            <div className="border-b border-opacity-25">
                <p className='text-3xl font-semibold m-5'>{map.get('country.'+language)}: {opportunity.countries}</p>
                <p className='text-4xl font-semibold m-5 mr-80'>{opportunity.name}</p>
                <p className='text-1xl font-semibold ml-5 mb-0 text-slate-500'>{map.get('for.the.'+language)} {opportunity.createdBy}</p>
                <p className='text-1xl ml-5 mb-10'>{opportunity.organization}</p>
            </div>

            <div className="grid grid-rows-1 grid-flow-col gap-4">

                <div className="row-span-3 mt-10 ml-5">
                    <Image src={opportunity.bannerUrl} className="justify-evenly rounded-xl outline-offset-[20px]" alt="Event Banner" width={535} height={326} />
                </div>
                <div className="col-span-1 mt-10 border border-opacity-25 rounded-xl border-slate-600">
                    <p className='text-1xl ml-5 mt-10 mb-1 mr-0 text-slate-500'>{map.get('eve.type.'+language)}</p>
                    <p className='text-1xl ml-5 mb-6'>{opportunity.type}</p>
                    <p className='text-1xl ml-5 mb-1 text-slate-500'>{map.get('min.vol.'+language)}</p>
                    <p className='text-1xl ml-5 mb-6'>{opportunity.minVolunteers} Volunteers</p>
                    <p className='text-1xl ml-5 mb-1 text-slate-500'>{map.get('eve.dur.'+language)}</p>
                    <p className='text-1xl ml-5 mb-6'>{opportunity.duration}</p>
                    <div className='styles.btn flex col gap-2 ml-5 mb-5'>
                        <button className={styles.buttonbooknownext} type="submit" onClick={() => setActive(opportunity.id)}>
                        {map.get('book.'+language)}
                        </button>
                    </div>
                </div>
            </div>
            <div className='styles.btn ml-5'>
                <button className={styles.buttoncause}>
                    {opportunity.causes}
                </button>
            </div>
            <div>
                <p className='text-2xl font-semibold mt-5 ml-5 mb-3 text-slate-800'>{map.get('abt.eve.'+language)}</p>
                <p className='text-xl ml-5 mb-5 mr-32 text-slate-700'>{opportunity.description}</p>
            </div>
            <div className="border border-opacity-25">
                <p className='text-2xl font-semibold mt-5 ml-5 mb-3 text-slate-800'>{map.get('prereq.'+language)}</p>
                <p className='text-xl ml-5 mb-5 mr-32 text-slate-700'>{opportunity.preRequisites}</p>
            </div>
            <div>
                <p className='text-2xl font-semibold mt-5 ml-5 mb-3 text-slate-800'>{map.get('eve.tl.'+language)}</p>
                <p className='text-xl ml-5 mb-5 mr-32 text-slate-700'>{opportunity.itinerary}</p>
            </div>
            <div className="border border-opacity-25">
                <p className='text-2xl font-semibold mt-5 ml-5 mb-3 text-slate-800'>{map.get('abt.the.'+language)} {opportunity.createdBy}, {opportunity.organization}</p>
                <p className='text-xl ml-5 mb-20 mr-32 text-slate-700'>{opportunity.bu}</p>
            </div>
            <Footer/>
        </div>
    );
}