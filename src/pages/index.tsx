import RatingsList from '@/app/components/RatingsList'
import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LCK ELO Ratings</title>
        <meta name="description" content="ELO ratings for LCK teams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <RatingsList />
      </main>
    </div>
  )
}

export default Home