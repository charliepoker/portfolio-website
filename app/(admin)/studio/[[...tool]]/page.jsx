'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'  // Changed from ../../../ to ../../../../

export default function StudioPage() {
  return <NextStudio config={config} />
}