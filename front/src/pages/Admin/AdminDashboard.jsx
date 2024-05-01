import React from 'react'

function AdminDashboard() {
  return (
    <>
    <main className='main py-6 px-4 bg-white rounded-3xl overflow-y-auto h-[95dvh]'>
      <div className='flex justify-between'>
      <div className='head text-slate-800 tracking-wider font-extrabold text-3xl'>Dashboard</div>
      {/* <Link> */}
      {/* <div>
      <button className='bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-orange-500'>Add Custom</button>
      </div> */}

      {/* </Link> */}
      </div>

      <section className='content-1 mt-6'>
        <div className='content-list gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <div className='grid grid-cols-2 px-4 py-6 bg-gray-100 rounded-lg hover:scale-105'>
          <div className='list-1 space-y-5'>
            <p className='capitalize font-thin'>All population level</p>
            <h1 className='font-bold text-2xl tracking-wider'>Name</h1>
            <p>Next content</p>
          </div>
          <div className='graph'>
            <img src='https://imgs.search.brave.com/yh-2Cv0P_jo_vQH3blTpOkBapXt0CtIwY9GKXgQVQaM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1zdGF0/aXN0aWNzLXByZXNl/bnRhdGlvbi13aXRo/LWFycm93XzIzLTIx/NDkwMjM3NTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc' className='w-30 grid place-items-center h-30'></img>
          </div>
          </div>
          <div className='grid grid-cols-2 px-4 py-6 bg-gray-100 rounded-lg hover:scale-105'>
          <div className='list-1 space-y-5'>
            <p className='capitalize font-thin'>All population level</p>
            <h1 className='font-bold text-2xl tracking-wider'>Name</h1>
            <p>Next content</p>
          </div>
          <div className='graph'>
            <img src='https://imgs.search.brave.com/yh-2Cv0P_jo_vQH3blTpOkBapXt0CtIwY9GKXgQVQaM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1zdGF0/aXN0aWNzLXByZXNl/bnRhdGlvbi13aXRo/LWFycm93XzIzLTIx/NDkwMjM3NTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc' className='w-30 grid place-items-center h-30'></img>
          </div>
          </div>
          <div className='grid grid-cols-2 px-4 py-6 bg-gray-100 rounded-lg hover:scale-105'>
          <div className='list-1 space-y-5'>
            <p className='capitalize font-thin'>All population level</p>
            <h1 className='font-bold text-2xl tracking-wider'>Name</h1>
            <p>Next content</p>
          </div>
          <div className='graph'>
            <img src='https://imgs.search.brave.com/yh-2Cv0P_jo_vQH3blTpOkBapXt0CtIwY9GKXgQVQaM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1zdGF0/aXN0aWNzLXByZXNl/bnRhdGlvbi13aXRo/LWFycm93XzIzLTIx/NDkwMjM3NTkuanBn/P3NpemU9NjI2JmV4/dD1qcGc' className='w-30 grid place-items-center h-30'></img>
          </div>
          </div>
        </div>

      </section>

      
    

    </main>
    </>

  )
}

export default AdminDashboard