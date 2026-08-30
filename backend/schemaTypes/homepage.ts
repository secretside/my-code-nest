import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Konten Homepage',
  type: 'document',
  fields: [
    // --- HERO SECTION (YANG LAMA) ---
    defineField({name: 'title', title: 'Judul Hero', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subjudul Hero', type: 'text'}),
    defineField({name: 'heroImage', title: 'Gambar Hero', type: 'image'}),

    // --- ABOUT SECTION (BARU) ---
    defineField({
      name: 'aboutTitle',
      title: 'Judul About',
      type: 'string',
      initialValue: 'Tentang Aksara Abadi',
    }),
    defineField({
      name: 'aboutContent',
      title: 'Isi Penjelasan About',
      type: 'text',
      rows: 4,
    }),
  ],
})
