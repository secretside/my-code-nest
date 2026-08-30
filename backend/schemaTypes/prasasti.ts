import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'prasasti',
  title: 'Data Prasasti (Blockchain)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama User',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Aksara Jawa (Transliterasi)',
      type: 'string',
    }),
    defineField({
      name: 'scriptType',
      title: 'Jenis Aksara',
      type: 'string',
      options: {
        list: [
          { title: 'Jawa', value: 'javanese' },
          { title: 'Sunda', value: 'sundanese' },
          { title: 'Bali', value: 'balinese' },
          { title: 'Makassar', value: 'makassar' },
        ],
      },
    }),
    defineField({
      name: 'txHash',
      title: 'Transaction Hash',
      type: 'string',
    }),
    defineField({
      name: 'txUrl',
      title: 'Transaction URL',
      type: 'url',
    }),
    defineField({
      name: 'timestamp',
      title: 'Waktu Pembuatan',
      type: 'datetime',
    }),
  ],
})