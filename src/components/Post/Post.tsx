import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comment/Comment'

import styles from './Post.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Author {
  name: string
  avatarURL: string
  authorRole: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  content: Content[]
  publishedDate: Date
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<string[]>([])
  const [newCommentContent, setNewCommentContent] = useState('')

  const publishedDateFormatted = format(
    post.publishedDate,
    "d 'de' LLLL 'às' HH:mm' horas'",
    {
      locale: ptBR,
    }
  )

  const relativeDateToNow = formatDistanceToNow(post.publishedDate, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleAddComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentContent])
    setNewCommentContent('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentContent(event.target.value)
  }

  function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatorio!')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOn = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOn)
  }

  const isNewCommentEmpty = newCommentContent.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarURL} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.authorRole}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedDate.toISOString()}
        >
          {relativeDateToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleAddComment} className={styles.commentForm}>
        <textarea
          placeholder='Digite aqui o seu comentário'
          value={newCommentContent}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment} content={comment} onDelete={deleteComment} />
        ))}
      </div>
    </article>
  )
}
