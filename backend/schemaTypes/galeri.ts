import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galeri',
  title: 'Galeri Foto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Foto',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true, // Agar bisa di-crop otomatis
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Keterangan',
      type: 'text',
      rows: 3,
    }),
  ],
})
