'use client'
import React, { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'

interface Repository {
    name: string
    id: number
    isFavorite: boolean
}

type NonUndefinedField<T> = {
  [P in keyof T]: Exclude<T[P], undefined>
}

const Repos = () => {

    const { 

        data: repositories, 
        isFetching,
        setData: setRepos

    } = useFetch<Repository[]>('https://api.github.com/users/MatheusMottaGit/repos')

    console.log(repositories)

    function handleFavoriteRepository(repoId: number){
        const toFavorite: NonUndefinedField<Repository[]> = repositories?.map((repo) => {
          return repo.id === repoId ? {...repo, isFavorite: !repo.isFavorite} : repo
        })

        setRepos(toFavorite)
    }

  return (
    <div>
      {isFetching && <p>Carregando...</p>}
      {repositories?.map(repo => {

        return (
          <div key={repo.id} className='flex gap-2 mt-4'>
              <p>
                {repo.name}
                { repo.isFavorite && <p>(favorito)</p> }
              </p>
              <button onClick={() => {handleFavoriteRepository(repo.id)}} className='border-solid border-[1px] p-1 border-black'>
                  favoritar
              </button>
          </div>
        )
      })}
    </div>
  )
}

export default Repos