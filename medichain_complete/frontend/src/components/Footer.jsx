import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Logo + About */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="MediChain Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            MediChain is a secure, transparent, and decentralized healthcare management system
            built on blockchain technology. It aims to overcome challenges in the current healthcare
            sector such as fragmented medical records, lack of data security, slow information
            sharing, and unauthorized access. By leveraging blockchain, MediChain ensures data
            integrity, privacy, and accessibility for patients, doctors, and healthcare institutions.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href="tel:+919999999999">+91 **********</a></li>
            <li><a href="mailto:Medichain+123@gmail.com">Medichain+123@gmail.com</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2025 @ Medichain+123@gmail.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
