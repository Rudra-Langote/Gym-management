import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';




const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto flex flex-col md:flex-row text-center justify-center md:justify-between items-center">
                    
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">RK Fitness</h2>
                        <p className="text-sm">Your journey to health and fitness starts here. Join RK Fitness today for a better tomorrow.</p>
                    </div>

                    
                    <div className="mb-4 md:mb-0">
                        <ul className="flex flex-col md:flex-row gap-4 text-sm">
                            <li><Link href="#Top" className="hover:text-yellow-500">Home</Link></li>
                            <li><Link href="#Blog" className="hover:text-yellow-500">About</Link></li>
                            <li><Link href="#Package" className="hover:text-yellow-500">Package</Link></li>
                            <li><Link href="#Service" className="hover:text-yellow-500">Service</Link></li>
                        </ul>
                    </div>

                    
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm"><strong>Address:</strong> 123 Gym Street, City, Country</p>
                        <p className="text-sm"><strong>Phone:</strong> (123) 456-7890</p>
                        <p className="text-sm"><strong>Email:</strong> info@RKfitness.com</p>
                    </div>

                    
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="hover:text-yellow-500 text-3xl"><i className="fa-brands fa-square-github"></i></a>
                        <a href="#" aria-label="Instagram" className="hover:text-yellow-500 text-3xl"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter" className="hover:text-yellow-500 text-3xl"><i className="fa-solid fa-envelope"></i></a>
                    </div>
                </div>

                <div className="mt-8 text-center border-t border-gray-700 pt-4 text-xs">
                    <p>&copy; 2024 RK Fitness. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default Footer
