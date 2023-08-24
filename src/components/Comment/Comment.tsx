import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'

import styles from './Comment.module.css'
import { Avatar } from '../Avatar/Avatar'

interface CommentProps {
  content: string
  onDelete: (comment: string) => void
}

export function Comment({ content, onDelete }: CommentProps) {
  const [likeComment, setLikeComment] = useState(0)

  function handleLikeComment() {
    setLikeComment((state) => {
      return state + 1
    })
  }

  function handleDeleteComment() {
    onDelete(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src='https://avatars.githubusercontent.com/u/97986080?v=4'
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Lui</strong>
              <time
                title='11 de maio às 08:02 horas'
                dateTime='2022-05-11 08:12:30'
              >
                Cerca de 1 hora atrás
              </time>
            </div>

            <button title='Deletar comentário' onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeComment}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
