import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas' // Add this import

export default defineConfig({
  name: 'default',
  title: 'My Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes // Change from [] to schemaTypes
  }
})