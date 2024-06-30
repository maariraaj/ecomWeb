import React, { useContext } from 'react'
import CartContext from './cart-context'
import HomeList from './HomeList';

const Home = () => {
    const ctx = useContext(CartContext);

    return (
        <>
            <div className='container'>
                <div className="row justify-content-center">
                    <button type='button' className='btn btn-outline-primary mt-5 mb-5'>Get Our Latest Album</button>
                    <button type='button' className="btn mt-3 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play-circle " viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='container'>
                <h1 className="text-center mb-5">Tour</h1>
                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead>
                            <tr className='table-secondary'                                                                                                                 >
                                <th>Date</th>
                                <th>Location</th>
                                <th>Tour</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {ctx.tourList.map((tour) => (
                                <HomeList
                                    key={tour.id}
                                    id={tour.id}
                                    title={tour.title}
                                    location={tour.location}
                                    date={tour.date}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default Home