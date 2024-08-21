// /src/componentes/Support/SupportDevelopers.jsx

import React from 'react';
import ButtonWhatsapp from './ButtonWhatsapp';
import matiLogo from '../../../assets/matiLogo.webp'
import juliLogo from '../../../assets/juliLogo.webp'
import nahuelLogo from '../../../assets/nahuelLogo.webp'
const developers = [
  {
    name: 'Julian',
    whatsappLink: 'https://wa.me/3772430213', // Reemplaza con el número de Julian
    logo: juliLogo// Reemplaza con la ruta del logo de Julian
  },
  {
    name: 'Matias',
    whatsappLink: 'https://wa.me/3424093379', // Reemplaza con el número de Matias
    logo: matiLogo // Reemplaza con la ruta del logo de Matias
  },
  {
    name: 'Nahuel',
    whatsappLink: 'https://wa.me/2616124150', // Reemplaza con el número de Nahuel
    logo: nahuelLogo // Reemplaza con la ruta del logo de Nahuel
  }
];

const SupportDevelopers = () => {
  return (
    <div className='flex gap-16 max-md:flex-col justify-center items-center'>
      {developers.map((developer, index) => (
        <ButtonWhatsapp
          key={index}
          whatsappLink={developer.whatsappLink}
          logo={developer.logo}
          name={developer.name}
        />
      ))}
    </div>
  );
};

export default SupportDevelopers;
