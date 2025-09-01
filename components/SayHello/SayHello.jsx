'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { client } from '@/lib/sanity'

function SayHello() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "sayHello"][0]{
        title,
        email
      }`
      const result = await client.fetch(query)
      setData(result)
    }

    fetchData()
  }, [])

  if (!data) return null // or loader if you want

  return (
    <div className={styles.hello}>
      <p>{data.title}</p>
      <a href={`mailto:${data.email}`}>{data.email}</a>
    </div>
  )
}

export default SayHello
