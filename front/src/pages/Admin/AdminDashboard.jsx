import React from 'react'

function AdminDashboard() {
  return (
    <>
    <main className='main py-6 px-4 bg-green-100 rounded-3xl h-fit'>
      <div className='flex justify-between'>
      <div className='head text-green-800 tracking-wider font-extrabold text-3xl'>Dashboard</div>
      {/* <Link> */}
      <div>
      <button className='bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-green-800'>Add Custom</button>
      </div>

      {/* </Link> */}
      </div>

      <section className='content-1 mt-6'>
        <div className='content-list gap-6 grid grid-cols-3'>
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

      <section className='body mt-6'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='content bg-gray-100 rounded-lg hover:scale-105 py-4 px-4  h-80 grid place-items-center'>
              <p className='font-bold text-xl'>Waste Processing Level</p>
              <h1 className='text-5xl font-bold'>72%</h1>
              <img src='https://cdn.discordapp.com/attachments/1217051055301328896/1234434067773132810/H0wKS.png?ex=6630b7d0&is=662f6650&hm=4e81c5fb6d85ab6e474dd5896de2cb8d2aa41bc85c353a26b7c86d5fc95fe54c&' className=''></img>
              <p>Deviation Index <span className='font-bold'>2%</span> </p>

            </div>

            <div className='content bg-gray-100 rounded-lg hover:scale-105 py-4 px-4  h-80 grid place-items-center'>
              <p className='font-bold text-xl'>Waste Processing Level</p>
              <h1 className='text-5xl font-bold'>72%</h1>
              <div className='flex justify-between space-x-32'>
                <div>
                <p className='font-semibold'>Solar Energy</p>
                </div>
                <div>
                  <p>32%</p>
                </div>
              </div>
              <div className='flex justify-between space-x-32'>
                <div>
                <p className='font-semibold'>Solar Energy</p>
                </div>
                <div>
                  <p>32%</p>
                </div>
              </div>
              <div className='flex justify-between space-x-32'>
                <div>
                <p className='font-semibold'>Solar Energy</p>
                </div>
                <div>
                  <p>32%</p>
                </div>
              </div>
              {/* <Link> */}
              <button className='w-full border-2 border-black hover:border-green-800 hover:bg-green-800 py-2 px-2 text-lg font-semibold rounded-lg hover:text-white'>View all details</button>

              {/* </Link> */}

            </div>
          </div>
          <div className='another grid rounded-lg px-4 py-4 hover:scale-105 bg-gray-100  grid-cols-2'>
            <div className='another-content'>
            <p className='font-bold text-xl'>Waste Processing Level</p>
            <p className='font-light mb-4'>Percentage of renewable energy sources used in manufacturing industries</p>
            <div className='space-y-2'>
            <p className='font-semibold tracking-widest'>Ukrain-89%</p>
            <p className='font-semibold tracking-widest'>Ukrain-89%</p>
            <p className='font-semibold tracking-widest'>Ukrain-89%</p>
            <p className='font-semibold tracking-widest'>Ukrain-89%</p>
            <p className='font-semibold tracking-widest'>Ukrain-89%</p>
            
            </div>

            </div>
            <div className='image'>
              <img src='https://imgs.search.brave.com/qAmEglsr_kGK43xao6oVR_gegRPaiONQiQiAy-lhQsY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzYxLzc4LzIw/LzM2MF9GXzE2MTc4/MjAxMl9UcGx3M1Fx/UFB3QXA2UjlpNmZw/aVZUd2JiRGdDb0xx/Ny5qcGc' className=''></img>
            </div>

          </div>
        </div>

      </section>

      <section className='last'>
        <div className='grid grid-cols-2 gap-6 mt-6 '>
          <div className='space-y-4'>
            <div className='first-times text-white bg-slate-950 rounded-full text-center'>
              <div className='py-6'>
                <p>Climate Change index</p>
                <p>Impact of another activities on climate</p>
              </div>
            </div>
            <div className='first-times text-black bg-green-200 rounded-full text-center'>
              <div className='py-6'>
                <p className='font-semibold'>Climate Change index</p>
                <p>Impact of another activities on climate</p>
              </div>
            </div>
          </div>
          <div className='bg-green-900 rounded-3xl hover:scale-105 px-4 py-4 text-white'>
            <p className='font-semibold tracking-wide'>AeuxGlobal</p>
            <div className='grid grid-cols-2'>
              <div className='mt-6'>
              <h1 className='text-3xl tracking-wider font-bold'>Let's join our community</h1>
              <div  className='grid mt-6 grid-cols-4'>
              <img src='https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw' className='rounded-[50%] h-10 w-10'></img>
              <img src='https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw' className='rounded-[50%] h-10 w-10'></img>
              <img src='https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw' className='rounded-[50%] h-10 w-10'></img>
              <p>250k+ people</p>
              </div>
            </div>
            <div>
              <img src='https://imgs.search.brave.com/wlJDlfcVd_KFYcOPX37I_cobXFPa_9pyosEkkunVfZE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZmLzBk/LzM2L2ZmMGQzNjNl/N2IwZjc0NjkxMzEy/MjMzYmMwOTQ4NDcx/LmpwZw' className='h-44 w-full'></img>
            </div>
            </div>
           

          </div>
        </div>
      </section>
    

    </main>
    </>

  )
}

export default AdminDashboard