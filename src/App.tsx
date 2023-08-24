import { Header } from './components/Header/Header'
import { Post, PostType } from './components/Post/Post'
import { Sidebar } from './components/Sidebar/Sidebar'

import './global.css'

import styles from './App.module.css'

export function App() {
  const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarURL: 'https://github.com/Luizz14.png',
        name: 'Lulu da pomerania',
        authorRole: 'Desenvolvedor Mobile',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Faalaaa devv !!!',
        },
        {
          type: 'paragraph',
          content: 'Acabei de subir mais um projeto no meu github!!!',
        },
        {
          type: 'link',
          content: 'lui.desing/doc',
        },
      ],
      publishedDate: new Date('2023-05-08 20:00:00'),
    },
    {
      id: 2,
      author: {
        avatarURL: 'https://github.com/maykbrito.png',
        name: 'Maykão',
        authorRole: 'Educador @Rocketseat',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Faalaaa devv !!!',
        },
        {
          type: 'paragraph',
          content: 'Acabei de subir mais um projeto no meu github!!!',
        },
        {
          type: 'link',
          content: 'lui.desing/doc',
        },
      ],
      publishedDate: new Date('2023-05-10 20:00:00'),
    },
  ]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />
          })}
        </main>
      </div>
    </div>
  )
}
