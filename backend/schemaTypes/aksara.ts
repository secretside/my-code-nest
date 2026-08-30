import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aksara',
  title: 'Ensiklopedia Aksara',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Aksara',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'origin',
      title: 'Asal Daerah',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Sejarah & Deskripsi',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'visual',
      title: 'Gambar Karakter Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'pronunciation',
      title: 'Audio Pelafalan',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
  ],
})
